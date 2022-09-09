import { Container } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../navbar/navbar.component";
import HtmlIcon from "../../assets/icons/html-5.png";
import DevOpsIcon from "../../assets/icons/devops.png";
import JavaScriptIcon from "../../assets/icons/js.png";
import SqlIcon from "../../assets/icons/sql-server.png";
import Questions from "../questionsTab/questions.component";
import axios from "axios";

const Home = () => {
  const topics = [
    { id: 0, topic: "HTML", src: HtmlIcon },
    { id: 1, topic: "JavaScript", src: JavaScriptIcon },
    { id: 2, topic: "SQL", src: SqlIcon },
    { id: 3, topic: "DevOps", src: DevOpsIcon },
  ];
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(
          "https://quizapi.io/api/v1/questions?apiKey=V7RxLSLo3E2DHXbKsRe3e6PLFsvCtlOg2GI8lJSh&tags=HTML&difficulty=Medium&limit=10"
        );
        setQuestions(constructObject(response.data));
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(`Error${error.message}`);
        }
      }
    };
    getQuestions();
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
      { id: 1, value: listOfOptions?.answer_a },
      {
        id: 2,
        value: listOfOptions?.answer_b,
      },
      {
        id: 3,
        value: listOfOptions?.answer_c,
      },
      {
        id: 4,
        value: listOfOptions?.answer_d,
      },
    ];
  };
  return (
    <Fragment>
      <Navbar></Navbar>
      <Container>
        {/* <Skills listOfTopics={topics}></Skills> */}
        <Questions questions={questions} />
      </Container>
    </Fragment>
  );
};

export default Home;
