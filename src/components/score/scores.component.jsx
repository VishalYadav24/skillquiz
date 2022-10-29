import { Home, Replay } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  circularProgressClasses,
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
import Loader from "../loading/loader.component";
/**
 * Shows user score based on correct answers provided by User,fetches score from local storage.
 * @param {*} param0
 * @returns screen with user Result
 */
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
  /**
   * Method for conversion of custom values (numbers) to scale of 0 to 100 for progress bar/circle.
   * @param {*} value - number
   * @returns
   */
  const normalise = (value) =>
    ((value - 0) * 100) / (userData?.provideQuestionsCount - 0);
  /**
   * When user click home button , redirects user to Home.
   */
  const handleHomeButton = () => {
    setUserAgreed(() => false);
    setRetry(() => false);
    setUserResponse(null);
    setQuestions([]);
    navigate("/", { replace: true });
  };
  /**
   * If user want to give re-test, user click Retest button,this redirect user to question tab with the same question which were provided earlier
   */
  const handleResetButton = () => {
    setUserAgreed(() => true);
    setRetry(() => true);
    setUserResponse(null);
    navigate("/questions", { replace: true });
  };
  return (
    <Fragment>
      <Box
        sx={{
          height: "100vh",
          background: "#E8E9EB",
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
          <Card
            sx={{
              padding: "16px",
              width: { xs: "350px", sm: "450px", md: "500px", lg: "500px" },
              textAlign: "center",
              background: "#38618C",
              color: "#E8E9EB",
              boxShadow: " 10px 20px 15px 5px darkblue",
            }}
          >
            <CardHeader title={`Congratulation  ${userData?.name}`} />

            <CardContent>
              <CommonStack direction="row" justifyContent="center">
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-flex",
                    padding: "1rem",
                  }}
                >
                  <Loader
                    size="150px"
                    variant="determinate"
                    value={normalise(userData?.score)}
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
                    <Typography variant="h6" component="div" color="#E8E9EB">
                      {userData?.score} / {userData?.provideQuestionsCount}
                    </Typography>
                  </Box>
                </Box>
              </CommonStack>

              <CommonStack direction="column">
                <Typography variant="h6">
                  Topic for quiz : {userData?.selectedTopic}{" "}
                </Typography>

                <Typography>
                  Level : {userData?.providedQuestionsLevel}{" "}
                </Typography>

                <Typography>
                  {" "}
                  Time Spent : {userData?.timeSpent} seconds{" "}
                </Typography>
                <Typography>
                  {" "}
                  Question attempted : {userData?.questionAttempted}{" "}
                </Typography>
              </CommonStack>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <CommonButton
                variant="contained"
                onClick={() => {
                  handleResetButton();
                }}
                sx={{
                  background: "#F06543",
                  color: "#E8E9EB",
                  "&:hover": {
                    background: "#E8E9EB",
                    color: "#38618C",
                  },
                }}
                startIcon={<Replay />}
              >
                Retest
              </CommonButton>
              <CommonButton
                variant="outlined"
                endIcon={<Home />}
                onClick={() => {
                  handleHomeButton();
                }}
                sx={{
                  background: "#E8E9EB",
                  color: "darkblue",
                  "&:hover": {
                    background: "#F06543",
                    color: "#E8E9EB",
                    borderColor: "#F06543",
                  },
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
