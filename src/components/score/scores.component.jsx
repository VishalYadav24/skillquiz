import { Home, Replay } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/annie-spratt-0ZPSX_mQ3xI-unsplash.jpg";
import CommonStack from "../custom-styles/commonstack.component";
import {
  CustomButton1,
  CustomButton2,
} from "../custom-styles/custom.component";
import CommonButton from "../custom-styles/custombutton.component";

const Scores = ({ setUserAgreed, setRetry, setUserResponse, setQuestions }) => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("User"));
    setUserData(() => {
      return getData;
    });
    setRetry(false);
  }, []);

  return (
    <Fragment>
      <Box
        sx={{
          height: "100vh",
          backgroundImage:" linear-gradient(to right top, #4776e6, #5870e9, #6968eb, #7c5feb, #8e54e9);",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <CommonStack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          height="100vh"
        >
          <Card sx={{ padding: "16px", width: "500px" }}>
            <CardHeader title={`Congratulation  ${userData?.name}`} />

            <CardContent>
              <CommonStack direction="row">
                <Typography variant="h4">Your Score : </Typography>
                <Typography variant="h4">
                  {" "}
                  {`${userData?.score} / ${userData?.provideQuestionsCount}`}{" "}
                </Typography>
              </CommonStack>
              <CommonStack direction="column">
                <Typography>
                  Topic for quiz : {userData?.selectedTopic}{" "}
                </Typography>

                <Typography>
                  Level : {userData?.providedQuestionsLevel}{" "}
                </Typography>

                <Typography>
                  {" "}
                  Time Spent : {userData?.timeSpent} seconds{" "}
                </Typography>
              </CommonStack>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <CommonButton
                variant="outlined"
                onClick={() => {
                  setUserAgreed(() => true);
                  setRetry(() => true);
                  setUserResponse(null);
                  navigate("/questions");
                }}
                startIcon={<Replay />}
              >
                Retest
              </CommonButton>
              <CommonButton
                variant="contained"
                endIcon={<Home />}
                onClick={() => {
                  setUserAgreed(() => false);
                  setRetry(() => false);
                  setUserResponse(null);
                  setQuestions([]);
                  navigate("/");
                }}
              >
                Home
              </CommonButton>
            </CardActions>
          </Card>
        </CommonStack>
      </Box>
    </Fragment>
  );
};

export default Scores;
