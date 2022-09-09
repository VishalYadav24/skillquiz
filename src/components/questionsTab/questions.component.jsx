import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useState } from "react";

const Questions = ({ questions }) => {
  
  const [currentQuestion, setcurrentQuestion] = useState(0);
  return (
    <Fragment>
      <Box textAlign="center">
        <Stack direction="row" gap={2} flexWrap="wrap">
          {questions.map((data, index) => {
            return (
              <Box key={index}>
                <Button variant="outlined">
                  <Typography variant="span">
                    Question
                    <br />
                    {index}
                  </Typography>
                </Button>
              </Box>
            );
          })}
        </Stack>
        <Divider>Question {currentQuestion + 1}</Divider>
        <Stack spacing={2}  alignItems="self-start">
          <Typography variant="body">
            {questions[currentQuestion]?.question}
          </Typography>
          <Box textAlign="left">
            <FormControl>
              <FormLabel id="radio-options">Options</FormLabel>
              <RadioGroup
              >
                

                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Questions;
