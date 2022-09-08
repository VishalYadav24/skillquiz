import { ArrowBack, Html, HtmlTwoTone } from "@mui/icons-material";
import { Card, CardContent, Paper, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar/navbar.component";
import HtmlIcon from "../../assets/icons/html-5.png";
import DevOpsIcon from "../../assets/icons/devops.png";
import JavaScriptIcon from "../../assets/icons/js.png";
import SqlIcon from "../../assets/icons/sql-server.png";
import { Link } from "react-router-dom";

const Home = () => {
  const categories = [
    { id: 0, topic: "HTML", src: HtmlIcon },
    { id: 1, topic: "JavaScript", src: JavaScriptIcon },
    { id: 2, topic: "SQL", src: SqlIcon },
    { id: 3, topic: "DevOps", src: DevOpsIcon },
  ];
  return (
    <Fragment>
      <Navbar></Navbar>
      <Container>
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
          {categories.map((listOfTopic) => {
            return (
              <Card
                key={listOfTopic.id}
                sx={{ margin: "1rem", padding: "2rem" }}
              >
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
      </Container>
    </Fragment>
  );
};

export default Home;
