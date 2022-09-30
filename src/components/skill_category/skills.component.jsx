import React, { Fragment } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Instructions from "../instructions/instructions.component";
import CommonStack from "../custom-styles/commonstack.component";
import CommonButton from "../custom-styles/custombutton.component";
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
  isLogined,
}) => {
  const [open, setOpen] = React.useState(false);
  /**
   * Control modal pop up action -open
   */
  const handleOpen = () => {
    setOpen(true);
    setQuestionLevel("Easy");
    setQuestionsRange(5);
  };
  /**
   * Control modal pop up action - close
   * @returns - none.
   */
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Box textAlign="center" padding={4}>
        <Typography variant="h5" fontWeight="400" sx={{fontSize:{xs:"1rem",sm:"1rem",md:"1.2rem",lg:"1.5rem"}}}>Choose a topic</Typography>
        <Typography varient="h6" fontWeight="400" sx={{fontSize:{xs:"1rem",sm:"1rem",md:"1.2rem",lg:"1.5rem"}}}>
          Test you knowledge on various topics
        </Typography>
      </Box>
      <CommonStack direction={{ xs: "column", sm: "row" }} flexWrap="wrap">
        {listOfTopics.map((listOfTopic) => {
          return (
            <Card
              key={listOfTopic.id}
              sx={{

                margin: "1rem",
                padding: "2rem",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: " 0 10px 40px 0 rgba(0, 0, 0, 0.4)",
                  zIndex: "3",
                  boxShadow:" 0.5rem 0.5rem black, -0.5rem -0.5rem #FF7D84"
                },
                border:""
              }}
            >
              <CardContent >
                <Box textAlign="center">
                  <img
                    width="auto"
                    height="75px"
                    src={listOfTopic.src}
                    alt={listOfTopic.topic}
                  ></img>
                  <Typography padding="16px" fontWeight="400" sx={{fontSize:{xs:"1rem",sm:"1rem",md:"1.2rem",lg:"1.5rem"}}}>{listOfTopic.topic}</Typography>
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
                    color="secondary"
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
    </Box>
  );
};

export default Skills;
