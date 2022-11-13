import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Questions from "./questions.component";
import userEvent from "@testing-library/user-event";
import { createPortal } from "react-dom";
describe("Questions component when no internet connection", () => {
  test("displays sorry message when network is off or any error comes while fetching question", async () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/questions"]}>
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
            isLoading={false}
            setIsLoading={setIsLoading}
            errorOccurred={true}
            setErrorOccurred={setErrorOccurred}
            previousUserResponse={previousUserResponse}
            setPreviousUserResponse={setPreviousUserResponse}
            setIsLogined={setIsLogined}
            setQuestions={setQuestions}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("click on home button to go back to home screen", async () => {
    const user = userEvent.setup();
    renderQuestion(true, false);
    const homeButton = screen.getByRole("button");

    await act(() => {
      fireEvent.click(homeButton);
      waitFor(() => {
        expect(
          screen.getByText("Test you knowledge on various topics")
        ).toBeInTheDocument();
      });
    });
    screen.debug();
  });
});

describe("snapshot test", () => {
  test("displays Please wait message when questions are loading", () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/questions"]}>
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
            isLoading={true}
            setIsLoading={setIsLoading}
            errorOccurred={false}
            setErrorOccurred={setErrorOccurred}
            previousUserResponse={previousUserResponse}
            setPreviousUserResponse={setPreviousUserResponse}
            setIsLogined={setIsLogined}
            setQuestions={setQuestions}
            attempts={[]}
            // handleClick={()=>{return null}}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});


const renderQuestion = (errorOccurred, isLoading) => {
  return render(
    // <MemoryRouter initialEntries={["/questions"]}>
    <BrowserRouter>
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
        setErrorOccurred={setErrorOccurred}
        previousUserResponse={previousUserResponse}
        setPreviousUserResponse={setPreviousUserResponse}
        setIsLogined={setIsLogined}
        setQuestions={setQuestions}
      />
    </BrowserRouter>
    //</MemoryRouter>
  );
};

const setIsLogined = () => {
  return null;
};
const setQuestions = () => {
  return null;
};
const setPreviousUserResponse = () => {
  return null;
};
const setErrorOccurred = () => {
  return null;
};
const handleDrawerToggle = () => {
  return null;
};
const setMobileOpen = () => {
  return null;
};
const setIsLoading = () => {
  return null;
};

const setUserAgreed = () => {
  return null;
};

const setUserResponse = () => {
  return null;
};



const questionsRange = 5;
const selectedTopic = "JavaScript";
const navbarHeight = 64;
const mobileOpen = false;
const questionLevel = "Easy";
const userResponse = {};

const previousUserResponse = {};
const questions = [
  [
    {
      id: 1,
      question: "How do you round the number 7.25, to the nearest integer?",
      options: [
        {
          id: 1,
          value: "Math.round(7.25)",
        },
        {
          id: 2,
          value: "round(7.25)",
        },
        {
          id: 3,
          value: "rnd(7.25)",
        },
        {
          id: 4,
          value: "Math.rnd(7.25)",
        },
      ],
      answer: {
        id: 1,
        value: "answer_a_correct",
      },
    },
    {
      id: 2,
      question: 'How do you call a function named "myFunction"?',
      options: [
        {
          id: 1,
          value: "myFunction()",
        },
        {
          id: 2,
          value: "call myFunction()",
        },
        {
          id: 3,
          value: "call function myFunction()",
        },
      ],
      answer: {
        id: 1,
        value: "answer_a_correct",
      },
    },
    {
      id: 3,
      question: "How do you declare a JavaScript variable?",
      options: [
        {
          id: 1,
          value: "v carName;",
        },
        {
          id: 2,
          value: "variable carName;",
        },
        {
          id: 3,
          value: "var carName;",
        },
      ],
      answer: {
        id: 3,
        value: "answer_c_correct",
      },
    },
    {
      id: 4,
      question: "Which event occurs when the user clicks on an HTML element?",
      options: [
        {
          id: 1,
          value: "onchange",
        },
        {
          id: 2,
          value: "onmouseclick",
        },
        {
          id: 3,
          value: "onmouseover",
        },
        {
          id: 4,
          value: "onclick",
        },
      ],
      answer: {
        id: 4,
        value: "answer_d_correct",
      },
    },
    {
      id: 5,
      question:
        "What is the correct JavaScript syntax to change the content of the HTML element below?",
      options: [
        {
          id: 1,
          value: '#demo.innerHTML = "Hello World!";',
        },
        {
          id: 2,
          value: 'document.getElementById("demo").innerHTML = "Hello World!";',
        },
        {
          id: 3,
          value: 'document.getElement("p").innerHTML = "Hello World!";',
        },
        {
          id: 4,
          value: 'document.getElementByName("p").innerHTML = "Hello World!";',
        },
      ],
      answer: {
        id: 2,
        value: "answer_b_correct",
      },
    },
  ],
];

const userData = {
  name: "xvxvxxv",
  email: "xvxvxcv@gmail.com",
  password: "vxvxcv",
  selectedTopic: "HTML",
  providedQuestions: [
    {
      id: 1,
      question: "What is the correct HTML for making a text area?",
      options: [
        { id: 1, value: '<input type="textbox">' },
        { id: 2, value: "<textarea>" },
        { id: 3, value: '<input type="textarea">' },
        { id: 4, value: "<textbox>" },
      ],
      answer: { id: 2, value: "answer_b_correct" },
    },
    {
      id: 2,
      question: "Which tag creates a check box for a form in HTML?",
      options: [
        { id: 1, value: "<checkbox>" },
        { id: 2, value: "<input checkbox>" },
        { id: 3, value: "<input=checkbox>" },
        { id: 4, value: '<input type="checkbox">' },
      ],
      answer: { id: 4, value: "answer_d_correct" },
    },
    {
      id: 3,
      question: "HTML supports",
      options: [
        { id: 1, value: "ordered lists" },
        { id: 2, value: "unordered lists" },
        { id: 3, value: "both type of lists" },
        { id: 4, value: "does not support those types" },
      ],
      answer: { id: 3, value: "answer_c_correct" },
    },
    {
      id: 4,
      question: "How can you make A bulleted list with numbers?",
      options: [
        { id: 1, value: "<dl>" },
        { id: 2, value: "<ul>" },
        { id: 3, value: "<ol>" },
        { id: 4, value: "<list>" },
      ],
      answer: { id: 3, value: "answer_c_correct" },
    },
    {
      id: 5,
      question:
        "All elements are identified by their __________ and are marked up using either start tags and end tags or self-closing tags",
      options: [
        { id: 1, value: "Attribute Names" },
        { id: 2, value: "Tag Names" },
        { id: 3, value: "Class Names" },
        { id: 4, value: "None of the mentioned" },
      ],
      answer: { id: 2, value: "answer_b_correct" },
    },
  ],
  provideQuestionsCount: 5,
  providedQuestionsLevel: "Easy",
  totalTimeProvided: 100,
  timeSpent: 44,
  userResponse: {
    1: { id: 2, value: "<textarea>" },
    2: { id: 2, value: "<input checkbox>" },
    3: { id: 2, value: "unordered lists" },
  },
  questionAttempted: 3,
  score: 1,
  allAttempted: false,
  accidentalClose: true,
};
