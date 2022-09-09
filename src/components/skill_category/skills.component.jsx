import React, { Fragment } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Link } from "react-router-dom";
const Skills = ({ listOfTopics }) => {
  return (
    <Fragment>
      <Box textAlign="center" bgcolor="skyblue">
        <Typography variant="h5">Choose a topic</Typography>
        <Typography varient="h6">
          Test you knowledge on various topics
        </Typography>
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        bgcolor="skyblue"
        justifyContent="center"
      >
        {listOfTopics.map((listOfTopic) => {
          return (
            <Card key={listOfTopic.id} sx={{ margin: "1rem", padding: "2rem" }}>
              <CardContent>
                <Box textAlign="center">
                  <img
                    width="75px"
                    src={listOfTopic.src}
                    alt={listOfTopic.topic}
                  ></img>
                  <Typography padding="16px">{listOfTopic.topic}</Typography>
                  {/* Button which will check if user has registered or not */}
                  <Link to="/register">Take a quiz</Link>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Fragment>
  );
};

export default Skills;
