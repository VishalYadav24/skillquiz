import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home/home.component";
import Questions from "./components/questionsTab/questions.component";
import Register from "./components/register/register.component.jsx";
import { topics, levels, limit } from "./components/constants/constant.jsx";
import axios from "axios";
import Scores from "./components/score/scores.component";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Notifications from "./components/notifications/notifications.component";
import defaultTheme from "./components/theme/theme.component";
function App() {
  const navbarHeight = "64px";
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
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [previousUserResponse, setPreviousUserResponse] = useState(null);
  const user = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      const { accidentalClose } = user;
      if (accidentalClose) {
        console.log("are bhai");
        setShowReturnDialog(() => true);
      }
    }
  }, []);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        if (user && userAgreed) {
          const API_KEY = "V7RxLSLo3E2DHXbKsRe3e6PLFsvCtlOg2GI8lJSh";
          if (!retry) {
            const response = await axios.get(
              `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&tags=${selectedTopic}&difficulty=${questionLevel}&limit=${questionsRange}`
            );
            if (response.status) {
              setQuestions(() => constructObject(response.data));

              setIsLoading(() => false);
              setErrorOccurred(() => false);
            }
          }
          if (retry) {
            const userData = JSON.parse(localStorage.getItem("User"));
            if (userData) {
              setQuestions(() => userData?.providedQuestions);
              if (userData?.accidentalClose) {
                const { userResponse, selectedTopic, providedQuestionsLevel } =
                  userData;
                setPreviousUserResponse(() => {
                  return { ...userResponse };
                });
                setSelectedTopic(() => selectedTopic);
                setQuestionLevel(() => providedQuestionsLevel);
              }
              setIsLoading(() => false);
              setErrorOccurred(() => false);
            }
          }
        }
      } catch (error) {
        setNotification((notification) => {
          return { message: error.message, type: "error" };
        });
        setShowNotification(true);
        setErrorOccurred(() => true);
        setIsLoading(() => false);
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
    const optionsArray = [];
    for (const key in listOfOptions) {
      if (listOfOptions[key]) {
        const optionsObject = {
          id: optionsArray.length + 1,
          value: listOfOptions[key],
        };
        optionsArray.push(optionsObject);
      }
    }
    return optionsArray;
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

  const handleResume = () => {
    setShowReturnDialog(() => false);
    setUserAgreed(() => true);
    setRetry(() => true);
    setUserResponse(null);
    setQuestionsRange(() => {
      return user?.provideQuestionsCount;
    });
    navigate("/questions");
  };

  const handleStartFresh = () => {
    const userResponseObj = {
      ...user,
      accidentalClose: false,
    };
    localStorage.setItem("User", JSON.stringify(userResponseObj));
    setShowReturnDialog(() => false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
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
                showReturnDialog={showReturnDialog}
                handleResume={handleResume}
                handleStartFresh={handleStartFresh}
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
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  errorOccurred={errorOccurred}
                  previousUserResponse={previousUserResponse}
                  setPreviousUserResponse={setPreviousUserResponse}
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
                setQuestions={setQuestions}
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
