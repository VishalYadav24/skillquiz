import { Apple, FacebookRounded, GitHub, Google } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  styled,
  TextField,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/annie-spratt-0ZPSX_mQ3xI-unsplash.jpg";

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

const Register = ({ setIsLogined }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [userNameError, setUserNameError] = useState(false);
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);
  
  useEffect(() => {
    setUserNameError(false);
    if (userName === "") {
      setUserNameError(true);
    }
  }, [userName]);

  useEffect(() => {
    setUserEmailError(false);
    if (userEmail === "") {
      setUserEmailError(true);
    }
  }, [userEmail]);

  useEffect(() => {
    setUserPasswordError(false);
    if (userPassword === "") {
      setUserPasswordError(true);
    }
  }, [userPassword]);

  useEffect(() => {
    setUserEmailError(false);
    setUserNameError(false);
    setUserPasswordError(false);
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();
    const User = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    try {
      if(!userNameError && !userEmailError && !userPasswordError){
        localStorage.setItem("User", JSON.stringify(User));
        setIsLogined(() => true);
        // navigate("/");
      }
  
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${Image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        component="form"
        
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Card sx={{ margin: " calc(100vh - 80vh) auto" }}>
          <CardHeader
            sx={{ paddingTop: "32px" }}
            title="Register you account with us!"
          ></CardHeader>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                name="Name"
                required
                placeholder="Name"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                error={userNameError}
              />
              <TextField
                name="Email"
                required
                placeholder="E-mail"
                value={userEmail}
                onChange={(event) => {
                  setUserEmail(event.target.value);
                }}
                error={userEmailError}
              />
              <TextField
                name="Password"
                required
                placeholder="Password"
                value={userPassword}
                onChange={(event) => {
                  setUserPassword(event.target.value);
                }}
                error={userPasswordError}
              />
              <CustomButton  variant="outlined" type="submit">
                REGISTER
              </CustomButton>
            </Stack>
            <Divider sx={{ paddingTop: "16px" }} variant="fullWidth">
              or Continue with
            </Divider>
            <Box textAlign="center" paddingTop="16px" paddingBottom="32px">
              <Apple fontSize="large"></Apple>
              <GitHub fontSize="large"></GitHub>
              <Google fontSize="large"></Google>
              <FacebookRounded fontSize="large"></FacebookRounded>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default Register;
