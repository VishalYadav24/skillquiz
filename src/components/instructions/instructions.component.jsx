import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MenuItem, Select } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.primary",
  border: "2px solid #413f3f",
  boxShadow: 24,
  p: 4,
};

const Instructions = ( props ) => {
  const {
    open,
    handleClose,
    handleOpen,
    children,
    levels,
    limit,
    questionsRange,
    setQuestionsRange,
    questionLevel,
    setQuestionLevel,
  } = props;
  const navigate = useNavigate();
 const onStart = () =>{
  navigate("/questions");
  }
  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backgroundColor: "white" }}
      >
        <Box sx={style} component="form">
          <Typography id="modal-title" variant="h6" component="h2">
            Select Level
            <Select
              variant="standard"
              value={questionLevel}
              onChange={(event) => {
                setQuestionLevel(event.target.value);
              }}
            >
              {levels.map((difficulty) => {
                return (
                  <MenuItem value={difficulty.label}>
                    {difficulty.label}
                  </MenuItem>
                );
              })}
            </Select>
            No of questions{" "}
            <Select
              variant="standard"
              sx={{ fontSize: "18px" }}
              value={questionsRange}
              onChange={(event) => {
                setQuestionsRange(event.target.value);
              }}
            >
              {limit.map((noOfQuestions) => {
                return (
                  <MenuItem value={noOfQuestions.range}>
                    {noOfQuestions.range}
                  </MenuItem>
                );
              })}
            </Select>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul>
              <li>User can select no of question to attempt</li>
              <li>User can select difficulty of question to attempt</li>
              <li>Time limit 15 sec.</li>
            </ul>
          </Typography>

          <Button variant="outlined" color="success" onClick={()=>{onStart()}}>
            Start
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Instructions;
