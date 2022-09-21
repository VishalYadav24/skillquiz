import { Home, Replay } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/annie-spratt-0ZPSX_mQ3xI-unsplash.jpg";

const CustomButton1 = styled(Button)({
  borderColor: "#3cd458",
  backgroundColor: "#fff",
  ":hover": {
    color: "#fff",
    backgroundColor: "#3cd458",
    borderColor: "#3cd458",
    boxShadow: "0 1px 10px rgb(60 212 88 / 40%)",
  },
});
const CustomButton2 = styled(Button)({
  borderColor: "#fff",
  backgroundColor: "#3cd458",
  ":hover": {
    color: "#3cd458",
    backgroundColor: "#fff",
    borderColor: "#3cd458",
    boxShadow: "0 1px 10px rgb(60 212 88 / 40%)",
  },
});

const Scores = ({ setUserAgreed, setRetry, setUserResponse,setQuestions }) => {
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
          backgroundImage: `url(${Image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          sx={{ height: "100vh" }}
        >
          <Card sx={{ padding: "16px", width: "500px" }}>
            <CardHeader title={`Congratulation  ${userData?.name}`} />

            <CardContent>
              <Stack direction="row">
                <Typography variant="h4">Your Score : </Typography>
                <Typography variant="h4">
                  {" "}
                  {`${userData?.score} / ${userData?.provideQuestionsCount}`}{" "}
                </Typography>
              </Stack>
              <Stack direction="column">
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
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <CustomButton1
                variant="outlined"
                onClick={() => {
                  setUserAgreed(() => true);
                  setRetry(() => true);
                  setUserResponse(null);
                  navigate("/questions",{replace:true});
                }}
                startIcon={<Replay />}
              >
                Retest
              </CustomButton1>
              <CustomButton2
                variant="contained"
                endIcon={<Home />}
                onClick={() => {
                  setUserAgreed(()=>false);
                  setRetry(() => false);
                  setUserResponse(null);
                  setQuestions([])
                  navigate("/",{replace:true});
                }}
              >
                Home
              </CustomButton2>
            </CardActions>
          </Card>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Scores;
