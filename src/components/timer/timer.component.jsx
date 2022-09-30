import { Box, circularProgressClasses, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Loader from "../loading/loader.component";

const Timer = ({
  questionsRange,
  totalTimeTaken,
  setTotalTimeTaken,
  setTimeOver,
}) => {
  const userData = JSON.parse(localStorage.getItem("User"));
  const totalTime = userData?.accidentalClose
    ? userData?.totalTimeProvided - userData?.timeSpent
    : questionsRange * 20;
  const [seconds, setSeconds] = useState(totalTime % 60);
  const [minute, setMinute] = useState(Math.floor(totalTime / 60));
  const normalise = (value) => ((value - 0) * 100) / (59 - 0);
  useEffect(() => {
    const Timer =
      seconds > 0 &&
      setInterval(() => {
        setSeconds((time) => time - 1);
      }, 1000);
    if (seconds === 0 && minute > 0) {
      setMinute(minute - 1);
      setSeconds(59);
    }
    if (minute === 0 && seconds === 0) {
      setSeconds(0);
      setTimeOver(true);
    }
    setTotalTimeTaken(() => totalTime - (seconds + minute * 60));
    return () => clearInterval(Timer);
  }, [seconds]);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <Loader
        size="100px"
        variant="determinate"
        value={normalise(seconds)}
        color="warning"
        sx={{
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
            transition: "1s linear all",
          },
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="div" color="green">
          {minute} : {seconds}
        </Typography>
      </Box>
    </Box>
  );
};

export default Timer;
