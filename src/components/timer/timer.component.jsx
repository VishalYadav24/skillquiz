
import React, { useEffect, useState } from "react";

const Timer = ({ questionsRange }) => {
  const totalTime = (questionsRange * 20);
  const [seconds, setSeconds] = useState(totalTime % 60);
  const [minute, setMinute] = useState(Math.floor(totalTime/60));
  useEffect(() => {
    const Timer =
      seconds > 0 &&
      setInterval(() => {
        setSeconds((time) => time - 1);
      }, 1000);
    if ( (seconds === 0 && minute > 0)) {
      setMinute(minute -1);
      setSeconds(59);
    }
    if (minute === 0 && seconds === 0) {
      setSeconds(0);
    }
    return () => clearInterval(Timer);
  }, [seconds]);

  return (
    <div>
      Countdown:{minute} minutes : {seconds} seconds
    </div>
  );
};

export default Timer;
