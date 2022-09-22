import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  Radio,
  RadioGroup,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../custom-styles/custom.component";
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
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentOption, setCurrentOption] = useState("response");
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [timeOver, setTimeOver] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();
  const countScore = { score: 0 };

  useBeforeunload((event) => {
    if (attempts.length > 0) {
      calculateScores("closeTab");
      event.returnValue = "";
    }
  });

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
      questions.map((data) => {
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
    const userData = JSON.parse(localStorage.getItem("User"));

    const userResponseObj = {
      ...userData,
      selectedTopic: selectedTopic,
      providedQuestions: questions,
      provideQuestionsCount: questionsRange,
      providedQuestionsLevel: questionLevel,
      timeSpent: totalTimeTaken,
      userResponse: userResponse,
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
        <Box>
          <Typography variant="h4" textAlign="center" color="green">
            Sorry we are unable to fetch question at this moment!
          </Typography>
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
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5">{selectedTopic}</Typography>
                    <Typography>{questionLevel}</Typography>
                  </Box>
                  {questions.length > 0 && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      bgcolor="black"
                      sx={{
                        border: "1px solid lightskyblue",
                        borderRadius: "5px",
                        color: "white",
                        padding: "16px",
                      }}
                    >
                      <Timer
                        questionsRange={questionsRange}
                        totalTimeTaken={totalTimeTaken}
                        setTotalTimeTaken={setTotalTimeTaken}
                        setTimeOver={setTimeOver}
                      ></Timer>
                    </Stack>
                  )}
                </Stack>
              </CardContent>
              <Divider></Divider>
              <CardContent>
                <Box>
                  <Stack spacing={2} alignItems="self-start">
                    <Typography variant="h6">
                      {`${currentQuestion + 1} . ${
                        questions[currentQuestion]?.question
                      }`}
                    </Typography>
                    <Stack direction="column" textAlign="left">
                      <FormControl>
                        <FormLabel id="radio-options">Options</FormLabel>
                        <RadioGroup
                          value={currentOption || ""}
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
                    </Stack>
                  </Stack>
                  <Stack direction="row" justifyContent="center">
                    <Pagination
                      count={questionsRange}
                      page={currentQuestion + 1}
                      onChange={handleClick}
                    />
                  </Stack>
                </Box>
              </CardContent>
            </Card>
            <Divider style={{ padding: "16px" }}>Finish Quiz</Divider>

            <Box textAlign="end">
              <CustomButton variant="contained" color="success" type="submit">
                SUBMIT
              </CustomButton>
            </Box>
          </form>
        </Box>
      )}
    </Fragment>
  );
};

export default Questions;
