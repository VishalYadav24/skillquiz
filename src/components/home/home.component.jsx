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
import Timer from "../timer/timer.component";

const Home = ({
  questions,
  setQuestions,
  setIsLogined,
  isLogined,
  questionLevel,
  setQuestionLevel,
  questionsRange,
  setQuestionsRange,
  topics,
  limit,
  levels,
}) => {
  const user = JSON.parse(localStorage.getItem("User"));
  console.log(user);
  useEffect(() => {
    const getQuestions = async () => {
      try {
        if (user) {
          setIsLogined(true);
        } else {
          const response = await axios.get(
            "https://quizapi.io/api/v1/questions?apiKey=V7RxLSLo3E2DHXbKsRe3e6PLFsvCtlOg2GI8lJSh&tags=HTML&difficulty=Medium&limit=10"
          );
          setQuestions(constructObject(response.data));
          console.log("hello");
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error${error.message}`);
        }
      }
    };
    getQuestions();
    console.log("rendered", questions);
  }, []);

  const constructObject = (data) => {
    let questionsList = [];
    data.map((list, index) => {
      questionsList.push({
        id: index + 1,
        question: list?.question,
        options: constructOptions(list?.answers),
        answer: list?.correct_answer,
      });
    });
    return questionsList;
  };

  const constructOptions = (listOfOptions) => {
    return [
      { id: 1, value: listOfOptions?.answer_a || "" },
      {
        id: 2,
        value: listOfOptions?.answer_b || "",
      },
      {
        id: 3,
        value: listOfOptions?.answer_c || "",
      },
      {
        id: 4,
        value: listOfOptions?.answer_d || "",
      },
    ];
  };
  return (
    <Fragment>
      <Navbar user={user || {name:"User name"}} isLogined={isLogined}></Navbar>
      <Container>
        <Skills
          listOfTopics={topics}
          levels={levels}
          limit={limit}
          questionLevel={questionLevel}
          setQuestionLevel={setQuestionLevel}
          questionsRange={questionsRange}
          setQuestionsRange={setQuestionsRange}
        ></Skills>
        <Outlet></Outlet>
        <Timer></Timer>
        {[questionLevel,questionsRange]}
      </Container>
    </Fragment>
  );
};

export default Home;
