import { Container } from "@mui/system";
import React, { Fragment } from "react";
import Navbar from "../navbar/navbar.component";
import Skills from "../skill_category/skills.component";
import { Outlet } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { CustomButton1, CustomButton2 } from "../custom-styles/custom.component";
import CommonStack from "../custom-styles/commonstack.component";
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
         <CommonStack
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
        </CommonStack>
                
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
