import { Container } from "@mui/system";
import React, { Fragment } from "react";
import Navbar from "../navbar/navbar.component";
import Skills from "../skill_category/skills.component";
import { Outlet } from "react-router-dom";


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
  handleDrawerToggle
}) => {
  
  return (
    <Fragment>
      <Navbar user={ isLogined? user :{name:"User name"}} navbarHeight={navbarHeight} isLogined={isLogined} setIsLogined={setIsLogined} handleDrawerToggle={handleDrawerToggle}></Navbar>
      <Container>
       {  !userAgreed &&<Skills
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
          
        ></Skills>}
        {userAgreed && <Outlet></Outlet>}
      </Container>
    </Fragment>
  );
};

export default Home;
