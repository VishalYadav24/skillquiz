import { Container } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar/navbar.component";
import HtmlIcon from "../../assets/icons/html-5.png";
import DevOpsIcon from "../../assets/icons/devops.png";
import JavaScriptIcon from "../../assets/icons/js.png";
import SqlIcon from "../../assets/icons/sql-server.png";
import Questions from "../questionsTab/questions.component";
import Skills from "../skill_category/skills.component";
import axios from "axios";
import { Outlet } from "react-router-dom";


const Home = ({
  questions,
  setQuestions,
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
  constructObject,
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
          
        ></Skills>}
        {userAgreed && <Outlet></Outlet>}
      </Container>
    </Fragment>
  );
};

export default Home;
