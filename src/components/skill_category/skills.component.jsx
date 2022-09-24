import React, { Fragment } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Instructions from "../instructions/instructions.component";
import CommonStack from "../custom-styles/commonstack.component";
const Skills = ({
  listOfTopics,
  levels,
  limit,
  selectedTopic,
  setSelectedTopic,
  questionLevel,
  questionsRange,
  setQuestionsRange,
  setQuestionLevel,
  userAgreed,
  setUserAgreed,
  isLogined

}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setQuestionLevel("Easy");
    setQuestionsRange(5);
  };
  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <Box textAlign="center" bgcolor="skyblue">
        <Typography variant="h5">Choose a topic</Typography>
        <Typography varient="h6">
          Test you knowledge on various topics
        </Typography>
      </Box>
      <CommonStack
        direction={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        bgcolor="skyblue"
        
      >
        {listOfTopics.map((listOfTopic) => {
          return (
            <Card key={listOfTopic.id} sx={{ margin: "1rem", padding: "2rem" }}>
              <CardContent>
                <Box textAlign="center">
                  <img
                    width="75px"
                    src={listOfTopic.src}
                    alt={listOfTopic.topic}
                  ></img>
                  <Typography padding="16px">{listOfTopic.topic}</Typography>
                  {/* Button which will check if user has registered or not */}
                  <Instructions
                    open={open}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    levels={levels}
                    limit={limit}
                    questionLevel={questionLevel}
                    setQuestionLevel={setQuestionLevel}
                    questionsRange={questionsRange}
                    setQuestionsRange={setQuestionsRange}
                    userAgreed={userAgreed}
                    setUserAgreed={setUserAgreed}
                    isLogined={isLogined}
                  >
                    <Typography
                      padding="16px"
                      variant="body"
                      onClick={() => {
                        setSelectedTopic(listOfTopic?.topic);
                      }}
                    >
                      Take a quiz
                    </Typography>
                  </Instructions>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </CommonStack>
    </Fragment>
  );
};

export default Skills;
