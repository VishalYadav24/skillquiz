import { More } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../drawer/drawer.component";
import Timer from "../timer/timer.component";

const count = {};

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
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentOption, setCurrentOption] = useState("");
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();


  const handleClick = (event, value) => {
    if (value <= questions.length) {
      handlePageMovement(value);
      setCurrentQuestion(value - 1);
    }
  };

  const handlePageMovement = (value) => {
    if (value < currentQuestion + 1) {
      setCurrentOption(count[currentQuestion]?.value);
    } else {
      setCurrentOption(count[value]?.value);
    }
  };
  const onQuizSubmit = (event) => {
    event.preventDefault();

    for (const key in userResponse) {
      questions.map((data) => {
        if (data.id === Number(key)) {
          if (data.answer?.id === userResponse[key]?.id) {
            setScore((prev) => Number(prev) + 1);
          }
        }
      });
    }

    
      submitDataToLocalStorage();
    
  };

  const submitDataToLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem("User"));

    const d = {
      ...userData,
      selectedTopic: selectedTopic,
      providedQuestions: questions,
      provideQuestionsCount: questionsRange,
      providedQuestionsLevel: questionLevel,
      timeSpent: totalTimeTaken,
      userResponse: userResponse,
      score: score,
      allAttempted: "",
    };
    localStorage.clear();
    localStorage.setItem("User", JSON.stringify(d));
    navigate("/score")
  };

  return (
    <Fragment>
      <ResponsiveDrawer
        questions={questions}
        navbarHeight={navbarHeight}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      ></ResponsiveDrawer>
      <form onSubmit={onQuizSubmit}>
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography variant="h5">{selectedTopic}</Typography>
                <Typography>{questionLevel}</Typography>
              </Box>
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
                ></Timer>
              </Stack>
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
                  {/* {questions[currentQuestion]?.options?.map((listOfTopic) => {
                  return (
                    <Button
                    key={listOfTopic?.id}
                    sx={{ margin: "16px" }}
                    onClick={() =>
                      setUserResponse((prev) => [
                        ...prev,
                        {
                          questionId: currentQuestion + 1,
                          response: [
                            { id: listOfTopic?.id, value: listOfTopic.value },
                          ],
                        },
                      ])
                    }
                    variant="outlined"
                    >
                    {listOfTopic.value}
                    </Button>
                    );
                  })} */}

                  <FormControl>
                    <FormLabel id="radio-options">Options</FormLabel>
                    <RadioGroup
                      value={currentOption}
                      onChange={(e) => {
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
                      }}
                    >
                      {questions[currentQuestion]?.options.map((optionList) => {
                        return (
                          <FormControlLabel
                            key={optionList?.id}
                            value={optionList?.value}
                            control={<Radio />}
                            label={optionList?.value}
                          />
                        );
                      })}
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
          <Button variant="contained" color="success" type="submit">
            SUBMIT
          </Button>
        </Box>
      </form>
    </Fragment>
  );
};

export default Questions;
