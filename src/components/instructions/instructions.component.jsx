import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Fade, MenuItem, Select, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #f7f0f0",
  boxShadow: 24,
  p: 4,
};

const CustomButton = styled(Button)({
  borderColor: "#3cd458",
  backgroundColor: "#fff",
  ":hover": {
    color: "#fff",
    backgroundColor: "#3cd458",
    borderColor: "#3cd458",
    boxShadow: "0 1px 10px rgb(60 212 88 / 40%)",
  },
});
const Instructions = (props) => {
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
    userAgreed,
    setUserAgreed,
    isLogined,
  } = props;
  const navigate = useNavigate();
  const onStart = () => {
    handleClose();
    navigate("/questions");
    setUserAgreed(true);
  };
  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style} component="form">
            {isLogined ? (
              <Box>
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
                        <MenuItem key={difficulty?.id} value={difficulty.label}>
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
                    defaultValue={5}
                    onChange={(event) => {
                      setQuestionsRange(event.target?.value);
                    }}
                  >
                    {limit.map((noOfQuestions) => {
                      return (
                        <MenuItem
                          key={noOfQuestions?.id}
                          value={noOfQuestions.range}
                        >
                          {noOfQuestions.range}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Typography>
                <Typography
                  component="div"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  <ul>
                    <li>User can select no of question to attempt</li>
                    <li>User can select difficulty of question to attempt</li>
                    <li>Time limit 20 sec.</li>
                    <li> correct : +1 incorrect: 0</li>
                  </ul>
                </Typography>

                <CustomButton
                  variant="outlined"
                  color="success"
                  onClick={() => {
                    onStart();
                  }}
                >
                  Start
                </CustomButton>
              </Box>
            ) : (
              <Box>
                
                <Typography variant="h5" color="green">To continue please register <Link color="success" to="/register" sx={{color:" green"}}>Register</Link> </Typography>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Instructions;
