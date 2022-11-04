import { Container } from "@mui/system";
import React, { Fragment } from "react";
import Navbar from "../navbar/navbar.component";
import Skills from "../skill_category/skills.component";
import { Outlet } from "react-router-dom";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

import CommonStack from "../custom-styles/commonstack.component";
import CommonButton from "../custom-styles/custombutton.component";
import { FavoriteOutlined } from "@mui/icons-material";
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
    <Box sx={{ height: "100vh" }} bgcolor="#E8E9EB">
      <Navbar
        user={isLogined ? user : { name: "User name" }}
        navbarHeight={navbarHeight}
        isLogined={isLogined}
        setIsLogined={setIsLogined}
        handleDrawerToggle={handleDrawerToggle}
        data-testid="Navbar"
      ></Navbar>

      <Container
        sx={{
          paddingBottom: "1rem",
          bgColor: "#E8E9EB",
          overflowX: "hidden",
          overflowY: "auto",
          minHeight: "calc(100vh - 112px)",
          background:"#E8E9EB"
        }}
      >
        {showReturnDialog ? (
          <CommonStack justifyContent="center" alignItems="center">
            <Card
              sx={{
                padding: "16px",
                width: { xs: "250px", sm: "350px", md: "500px", lg: "500px" },
                marginTop: "150px",
                bgcolor: "#FEDBD3",
              }}
            >
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
                <CommonButton
                  onClick={() => handleResume()}
                  sx={{
                    background: "#2F4858",
                    color: "#fefefe",
                    "&:hover": {
                      background: "#fefefe",
                      color: "#e91e63",
                    },
                    width:{xs:"100%",sm:"100%",md:"40%",lg:"30%",xl:"30%"}
                  }}
                >
                  Resume
                </CommonButton>
                <CommonButton
                  variant="outlined"
                  onClick={() => handleStartFresh()}
                  sx={{
                    background: "#fefefe",
                    color: "#2F4858",
                    borderColor: "#fefefe",
                    marginLeft:{xs:"0rem",sm:"0rem",md:".5rem",lg:"1rem",xl:"1rem"},
                    marginTop:{xs:"1rem",sm:"1rem",md:"0rem",lg:"0rem",xl:"0rem"},
                    "&:hover": {
                      background: "#2F4858",
                      color: "#fefefe",
                      borderColor: "#2F4858",
                    },
                    width:{xs:"100%",sm:"100%",md:"40%",lg:"30%",xl:"30%"}
                  }}
                >
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
      <Box
        className="footer"
        sx={{
          color: "#E8E9EB",
          background: "#313628",
          width: "100%",
          minHeight: "3rem",
          textAlign: "center",
          paddingTop: "1rem",
        }}
      >
        <span>Made in 2022 by Vishal Yadav</span>
      </Box>
    </Box>
  );
};

export default Home;
