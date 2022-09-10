import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home.component";
import Questions from "./components/questionsTab/questions.component";
import Register from "./components/register/register.component.jsx";
import HtmlIcon from "../src/assets/icons/html-5.png";
import JavaScriptIcon from "../src/assets/icons/js.png";
import SqlIcon from "../src/assets/icons/sql-server.png";
import DevOpsIcon from "../src/assets/icons/devops.png";
import axios from "axios";
function App() {
  const topics = [
    { id: 0, topic: "HTML", src: HtmlIcon },
    { id: 1, topic: "JavaScript", src: JavaScriptIcon },
    { id: 2, topic: "SQL", src: SqlIcon },
    { id: 3, topic: "DevOps", src: DevOpsIcon },
  ];
  const levels = [
    { id: 0, label: "Easy" },
    { id: 1, label: "Medium" },
    { id: 2, label: "Hard" },
  ];
  const limit = [
    { id: 0, range: 5 },
    { id: 1, range: 10 },
    { id: 2, range: 15 },
    { id: 3, range: 20 },
  ];
  const [questions, setQuestions] = useState([]);
  const [isLogined, setIsLogined] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questionLevel, setQuestionLevel] = useState("");
  const [questionsRange, setQuestionsRange] = useState("");
  const [userAgreed, setUserAgreed] = useState(false);
  const user = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    const getQuestions = async () => {
      if (user && userAgreed) {
        const API_KEY = "V7RxLSLo3E2DHXbKsRe3e6PLFsvCtlOg2GI8lJSh";
        const response = await axios.get(
          `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&tags=${selectedTopic}&difficulty=${questionLevel}&limit=${questionsRange}`
        );
       setQuestions( constructObject(response.data));
      }
    };
    getQuestions();
  }, [userAgreed]);

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
    <div className="App">
      {questionLevel}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              questions={questions}
              setQuestions={setQuestions}
              setIsLogined={setIsLogined}
              isLogined={isLogined}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              questionLevel={questionLevel}
              setQuestionLevel={setQuestionLevel}
              questionsRange={questionsRange}
              setQuestionsRange={setQuestionsRange}
              topics={topics}
              levels={levels}
              limit={limit}
              userAgreed={userAgreed}
              setUserAgreed={setUserAgreed}
              user={user}
              constructObject={constructObject}
            />
          }
        >
          <Route path="/questions" element={<Questions questions={questions} />}></Route>
        </Route>
        <Route path="/register" element={<Register></Register>} />
      </Routes>
    </div>
  );
}

export default App;
