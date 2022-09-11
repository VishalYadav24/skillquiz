import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
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
      <Box textAlign="center">
        <Divider>Question {currentQuestion + 1} </Divider>
        <Stack spacing={2} alignItems="self-start">
          <Typography variant="body">
            {questions[currentQuestion]?.question}
          </Typography>
          <Box textAlign="left">
            <FormControl>
              <FormLabel id="radio-options">Options</FormLabel>
              <RadioGroup>
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
          </Box>
        </Stack>
        <Divider></Divider>
        <Stack>
          <Pagination
            count={questionsRange}
            page={currentQuestion + 1}
            onChange={handleClick}
          />
        </Stack>
        <Divider>Finish Quiz</Divider>
        <Box padding={2}>
          <Button fullWidth variant="outlined" color="success">
            SUBMIT
          </Button>
        </Box>
      </Box>
      <Timer questionsRange={questionsRange}></Timer>
    </Fragment>
  );
};

export default Questions;
