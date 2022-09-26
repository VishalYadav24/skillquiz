import { Container } from "@mui/system";
import React, { Fragment } from "react";
import Navbar from "../navbar/navbar.component";
import Skills from "../skill_category/skills.component";
import { Outlet } from "react-router-dom";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

import CommonStack from "../custom-styles/commonstack.component";
import CommonButton from "../custom-styles/custombutton.component";
const Home = ({
  setIsLogined,
  isLogined,
  selectedTopic,
  setSelectedTopic,
  questionLevel,
  setQuestionLevel,
  questionsRange,
  setQuestionsRange,
  topics,
  limit,
  levels,
  userAgreed,
  setUserAgreed,
  navbarHeight,
  user,
  handleDrawerToggle,
  showReturnDialog,
  handleResume,
  handleStartFresh,
}) => {
  return (
    <Box>
      <Navbar
        user={isLogined ? user : { name: "User name" }}
        navbarHeight={navbarHeight}
        isLogined={isLogined}
        setIsLogined={setIsLogined}
        handleDrawerToggle={handleDrawerToggle}
      ></Navbar>

      <Container>
        {showReturnDialog ? (
          <CommonStack justifyContent="center" alignItems="center">
            <Card sx={{ padding: "16px", width: { xs: "250px", sm: "350px", md: "500px", lg: "500px" },marginTop:"150px",bgcolor:"#FEDBD3" }}>
              <CardHeader
                title="Attention!"
                subheader="You were not able to complete quiz previously"
              />
              <CardContent>
                <Typography>
                  Do you wish to resume from where you left
                </Typography>
              </CardContent>
              <CardContent>
                <CommonButton onClick={() => handleResume()} sx={{
                  background: "#2F4858",
                  color:"#fefefe",
                  "&:hover": {
                    background: "#fefefe",
                    color: "#e91e63",
                  },
                }}>
                  Resume
                </CommonButton>
                <CommonButton  variant="outlined" onClick={() => handleStartFresh()} sx={{
                  background: "#fefefe",
                  color:"#2F4858",
                  borderColor:"#fefefe",
                  marginLeft:"1rem",
                  "&:hover": {
                    background: "#2F4858",
                    color: "#fefefe",
                    borderColor:"#2F4858",
                  },
                }}>
                  Start Fresh!
                </CommonButton>
              </CardContent>
            </Card>
          </CommonStack>
        ) : (
          <Box padding={2}>
            {!userAgreed && (
              <Skills
                listOfTopics={topics}
                levels={levels}
                limit={limit}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                questionLevel={questionLevel}
                setQuestionLevel={setQuestionLevel}
                questionsRange={questionsRange}
                setQuestionsRange={setQuestionsRange}
                userAgreed={userAgreed}
                setUserAgreed={setUserAgreed}
                isLogined={isLogined}
              ></Skills>
            )}
            {userAgreed && <Outlet></Outlet>}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
