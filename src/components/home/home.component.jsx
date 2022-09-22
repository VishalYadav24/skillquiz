import { Container } from "@mui/system";
import React, { Fragment } from "react";
import Navbar from "../navbar/navbar.component";
import Skills from "../skill_category/skills.component";
import { Outlet } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

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
  handleStartFresh
}) => {
  return (
    <Fragment>
      <Navbar
        user={isLogined ? user : { name: "User name" }}
        navbarHeight={navbarHeight}
        isLogined={isLogined}
        setIsLogined={setIsLogined}
        handleDrawerToggle={handleDrawerToggle}
      ></Navbar>

      <Container>
        {showReturnDialog ? (
         <Stack
         direction="row"
         justifyContent="center"
         alignItems="center"
         flexWrap="wrap"
         sx={{ height: "80vh"}}
       >

         
            <Card sx={{ padding: "16px", width: "500px" }}>
             <CardHeader
             title="Attention!"
             subheader="You were not able to complete quiz previously"
             />
             <CardContent>
              <Typography>Do you wish to resume from where you left</Typography>
             </CardContent>
             <CardContent>
              <CustomButton1
              onClick={()=> handleResume()}
              >
                Resume
              </CustomButton1>
              <CustomButton2
              onClick={()=> handleStartFresh()}>
                Start Fresh!
              </CustomButton2>
             </CardContent>
          </Card>
        </Stack>
                
        ):
        (
          <Box>

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
    </Fragment>
  );
};

export default Home;
