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
import ResponsiveDrawer from "../drawer/drawer.component";
import Timer from "../timer/timer.component";

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
  onQuizSubmit,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleClick = (event, value) => {
    console.log(value);
    if (value <= questions.length) {
      setCurrentQuestion(value - 1);
    }
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
      <Card component="form" onSubmit={onQuizSubmit}>
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
              <Timer questionsRange={questionsRange}></Timer>
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
                {questions[currentQuestion]?.options?.map((listOfTopic) => {
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
                })}
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
        <Divider style={{ padding: "16px" }}>Finish Quiz</Divider>
        <CardContent>
          <Box textAlign="end">
            <Button variant="contained" color="success" type="submit">
              SUBMIT
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Questions;
