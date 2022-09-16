import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home.component";
import Questions from "./components/questionsTab/questions.component";
import Register from "./components/register/register.component.jsx";
import {topics,levels,limit} from "./components/constants/constant.jsx"
import axios from "axios";
import Scores from "./components/score/scores.component";
import { createTheme, ThemeProvider } from "@mui/material";
import Notifications from "./components/notifications/notifications.component";
const theme = createTheme({
  palette: {
    success: {
      main: "#3cd458",
    },
    secondary: {
      main: "#926dde",
    },
  },
  typography: {
    fontFamily: "Quicksand",
  },
});
function App() {
  const navbarHeight = "64px";
  const user = JSON.parse(localStorage.getItem("User"));
  const [questions, setQuestions] = useState([]);
  const [isLogined, setIsLogined] = useState(() =>
    localStorage.key(0) ? true : false
  );
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questionLevel, setQuestionLevel] = useState("");
  const [questionsRange, setQuestionsRange] = useState("");
  const [userAgreed, setUserAgreed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userResponse, setUserResponse] = useState(null);
  const [retry, setRetry] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");

  

  useEffect(() => {
    const getQuestions = async () => {
      try {
        if (user && userAgreed) {
          const API_KEY = "V7RxLSLo3E2DHXbKsRe3e6PLFsvCtlOg2GI8lJSh";
          if (!retry) {
            const response = await axios.get(
              `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&tags=${selectedTopic}&difficulty=${questionLevel}&limit=${questionsRange}`
            );
            setQuestions(() => constructObject(response.data));
          }
          if (retry) {
            const userData = JSON.parse(localStorage.getItem("User"));
            setQuestions(() => userData?.providedQuestions);
          }
        }
      } catch (error) {
         setNotification((notification) => {
          return { message: error.message, type: "error" };
        });
        setShowNotification(true);
      }
    };
    getQuestions();

    return () => setShowNotification(false);
  }, [userAgreed]);

  const constructObject = (data) => {
    let questionsList = [];
    data.map((list, index) => {
      questionsList.push({
        id: index + 1,
        question: list?.question,
        options: constructOptions(list?.answers),
        answer: constructAnswer(list?.correct_answers),
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

  const constructAnswer = (answers) => {
    let response;

    const answerObj = [
      {
        id: 1,
        value: "answer_a_correct",
      },
      {
        id: 2,
        value: "answer_b_correct",
      },
      {
        id: 3,
        value: "answer_c_correct",
      },
      {
        id: 4,
        value: "answer_d_correct",
      },
    ];

    for (const key in answers) {
      if (answers[key] === "true") {

        response = answerObj.find((data) => data.value === key);
      }
    }
    return response;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      
      <div className="App">
      <Notifications
        notification={notification}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                navbarHeight={navbarHeight}
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
                handleDrawerToggle={handleDrawerToggle}
                setShowNotification={setShowNotification}
                setNotification={setNotification}
              />
            }
          >
            <Route
              path="/questions"
              element={
                <Questions
                  questions={questions}
                  selectedTopic={selectedTopic}
                  questionLevel={questionLevel}
                  questionsRange={questionsRange}
                  navbarHeight={navbarHeight}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                  userResponse={userResponse}
                  setUserResponse={setUserResponse}
                  setUserAgreed={setUserAgreed}
                />
              }
            ></Route>
          </Route>
          <Route
            path="score"
            element={
              <Scores
                setUserAgreed={setUserAgreed}
                setRetry={setRetry}
                setUserResponse={setUserResponse}
              />
            }
          ></Route>
          <Route
            path="/register"
            element={
              <Register
                setIsLogined={setIsLogined}
                setShowNotification={setShowNotification}
                setNotification={setNotification}
                setUserAgreed={setUserAgreed}
              />
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
