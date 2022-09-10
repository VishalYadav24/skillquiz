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

const Questions = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleClick = (event,value) => {
    // const nextQuestion = currentQuestion + 1;
    if (value < questions.length) {
      setCurrentQuestion(value);
    }
  };

  return (
    <Fragment>
      <Box textAlign="center">
        <Stack direction="row" gap={2} flexWrap="wrap">
          {questions.map((data) => {
            return (
              <Box key={data?.id}>
                <Button variant="outlined">
                  <Typography variant="span">
                    Question
                    <br />
                    {data?.id}
                  </Typography>
                </Button>
              </Box>
            );
          })}
        </Stack>
        <Divider>Question {currentQuestion + 1}</Divider>
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
        <Stack spacing={2}>
      <Typography>Page: {currentQuestion +1 }</Typography>
      <Pagination count={10} page={currentQuestion+1} onChange={handleClick} />
    </Stack>
        <Divider>Finish Quiz</Divider>
        <Box padding={2}>
          <Button fullWidth variant="outlined" color="success">
            SUBMIT
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Questions;
