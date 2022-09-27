import { ArrowLeft } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate } from "react-router-dom";
import CommonStack from "../custom-styles/commonstack.component";

import CommonButton from "../custom-styles/custombutton.component";
import ResponsiveDrawer from "../drawer/drawer.component";
import Loader from "../loading/loader.component";
import Timer from "../timer/timer.component";


let count = {};

const Questions = ({
  questions,
  questionsRange,
  navbarHeight,
  mobileOpen,
  setMobileOpen,
  handleDrawerToggle,
  selectedTopic,
  questionLevel,
  userResponse,
  setUserResponse,
  setUserAgreed,
  setIsLoading,
  isLoading,
  errorOccurred,
  previousUserResponse,
  setPreviousUserResponse,
  setIsLogined,
  setQuestions
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentOption, setCurrentOption] = useState("response");
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [timeOver, setTimeOver] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();
  const countScore = { score: 0 };
  const userData = JSON.parse(localStorage.getItem("User"));
  const handleBackButton = (event)=>{
    const keys = Object.keys(count)?.length;
    if(keys){
      try{
        localStorage.removeItem("User");
        setIsLogined(false);
        setQuestions([]);
        setAttempts([]);
        setUserResponse(null)
        count = {};
      }
      finally{

        navigate("/register");
      }
    }
  }

  useEffect(()=>{
    window.addEventListener("popstate",handleBackButton());
    return ()=> window.removeEventListener("popstate",handleBackButton());
  },[])

  useBeforeunload((event) => {
    if (attempts.length > 0) {
      calculateScores("closeTab");
      event.returnValue = "";
    }
  });

  useEffect(()=>{
    if(userData?.accidentalClose){
    count = previousUserResponse ? previousUserResponse : {};
    const firstResponse = (Object.keys(count));
    setCurrentOption(()=> (count[firstResponse[0]]?.value || ""))};
    setUserResponse(() => count);
  },[previousUserResponse])

  useEffect(() => {
    if (timeOver) {
      calculateScores();
    }
  }, [timeOver]);

  useEffect(() => {
    for (const key in userResponse) {
      if (attempts.indexOf(key) === -1) {
        setAttempts((prev) => [...prev, key]);
      }
    }
  }, [currentOption]);

  const handleClick = (event, value) => {
    if (value <= questions.length) {
      setCurrentQuestion(value - 1);
      handlePageMovement(value);
    }
  };

  const handlePageMovement = (value) => {
    if (value - currentQuestion + 1 === 1) {
      setCurrentOption(count[currentQuestion]?.value);
    } else {
      setCurrentOption(count[value]?.value);
    }
  };
  const handleOptionsSelection = (e) => {
    if (count[currentQuestion + 1]) {
      count[currentQuestion + 1] = {
        id: questions[currentQuestion].options.find(
          (data) => data.value === e.target.value
        )?.id,
        value: e.target.value,
      };
    } else {
      count[currentQuestion + 1] = {
        id: questions[currentQuestion].options.find(
          (data) => data.value === e.target.value
        )?.id,
        value: e.target.value,
      };
    }
    setCurrentOption(count[currentQuestion + 1]?.value);
    setUserResponse(() => count);
  };

  const onQuizSubmit = (event) => {
    event.preventDefault();
    setIsLoading(() => true);
    count = {};
    calculateScores();
  };

  const calculateScores = (source) => {
    for (const key in userResponse) {
      questions?.map((data) => {
        if (data.id === Number(key)) {
          if (data.answer?.id === userResponse[key]?.id) {
            if (countScore["score"]) {
              countScore["score"] = Number(countScore["score"]) + 1;
            } else {
              countScore["score"] = 1;
            }
          }
        }
      });
    }

    submitDataToLocalStorage(source);
  };

  const submitDataToLocalStorage = (source) => {
   setPreviousUserResponse(()=> null);

    const userResponseObj = {
      ...userData,
      selectedTopic: selectedTopic,
      providedQuestions: questions,
      provideQuestionsCount: questionsRange,
      providedQuestionsLevel: questionLevel,
      totalTimeProvided:(questionsRange * 20),
      timeSpent: totalTimeTaken,
      userResponse: userResponse,
      questionAttempted: attempts?.length,
      score: countScore?.score,
      allAttempted: attempts?.length === questions?.length,
      accidentalClose: source? true:false
    };
    localStorage.clear();
    localStorage.setItem("User", JSON.stringify(userResponseObj));
    if (source !== "closeTab") {
      setUserAgreed(() => false);
      navigate("/score");
    }
  };

  return (
    <Fragment>
      {errorOccurred ? (
        <Box width="100%" textAlign="center">
          <Typography variant="h5" textAlign="center" color="green">
            Sorry we are unable to fetch question at this moment!
          </Typography>
          <CommonButton startIcon={<ArrowLeft/>} fullWidth={false} variant="outlined" onClick={()=>{
            setUserAgreed(false);
            navigate("/",{replace:true})
          }}>Home</CommonButton>
        </Box>
      ) : isLoading ? (
        <Box textAlign="center">
          <Typography>Please wait...</Typography>
          <Loader />
        </Box>
      ) : (
        <Box>
          <ResponsiveDrawer
            questions={questions}
            navbarHeight={navbarHeight}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            handleClick={handleClick}
            attempts={attempts}
          ></ResponsiveDrawer>
          <form onSubmit={onQuizSubmit}>
            <Card sx={{boxShadow: "0 8px 8px -4px lightblue",background:"#eee"}}>
              <CardContent>
                <CommonStack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5">{selectedTopic}</Typography>
                    <Typography>{questionLevel}</Typography>
                  </Box>
                  {questions.length > 0 && (
                    <CommonStack
                      direction="row"
                      alignItems="center"
                    
                    >
                      <Timer
                        questionsRange={questionsRange}
                        totalTimeTaken={totalTimeTaken}
                        setTotalTimeTaken={setTotalTimeTaken}
                        setTimeOver={setTimeOver}
                      ></Timer>
                    </CommonStack>
                  )}
                </CommonStack>
              </CardContent>
              <Divider></Divider>
              <CardContent>
                <Box>
                  <CommonStack spacing={2} alignItems="self-start">
                    <Typography variant="h6">
                      {`${currentQuestion + 1} . ${
                        questions[currentQuestion]?.question
                      }`}
                    </Typography>
                    <CommonStack direction="column" textAlign="left">
                      <FormControl>
                        <FormLabel id="radio-options">Options</FormLabel>
                        <RadioGroup
                          value={currentOption|| ""}
                          onChange={(e) => handleOptionsSelection(e)}
                        >
                          {questions[currentQuestion]?.options.map(
                            (optionList) => {
                              return (
                                <FormControlLabel
                                  key={optionList?.id}
                                  value={optionList?.value}
                                  control={<Radio />}
                                  label={optionList?.value}
                                />
                              );
                            }
                          )}
                        </RadioGroup>
                      </FormControl>
                    </CommonStack>
                  </CommonStack>
                  <CommonStack direction="row" justifyContent="center">
                    <Pagination
                      count={questionsRange}
                      page={currentQuestion + 1}
                      onChange={handleClick}
                    />
                  </CommonStack>
                </Box>
              </CardContent>
            </Card>
            <Divider style={{ padding: "16px" }}>Finish Quiz</Divider>

            <Box textAlign="end">
              <CommonButton variant="contained" color="success" type="submit">
                SUBMIT
              </CommonButton>
            </Box>
          </form>
        </Box>
      )}
    </Fragment>
  );
};

export default Questions;
