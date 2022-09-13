import { Home, Replay } from "@mui/icons-material";
import { CardCover } from "@mui/joy";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Image from "../../assets/annie-spratt-0ZPSX_mQ3xI-unsplash.jpg";
const Scores = ({}) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("User"));
    setUserData(() => {
      return getData;
    });
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
            <CardActions>
              

              <Paper sx={{width:"150px"}}>
                <Typography>Retest</Typography>
                <IconButton>
                  <Replay></Replay>
                </IconButton>
              </Paper>
              <Paper>
                <Typography>Home</Typography>
                <IconButton>
                  <Home />
                </IconButton>
              </Paper>
             
            </CardActions>
          </Card>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Scores;
