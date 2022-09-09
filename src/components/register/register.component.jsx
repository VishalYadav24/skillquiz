import { Apple, FacebookRounded, GitHub, Google } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/annie-spratt-0ZPSX_mQ3xI-unsplash.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = () => {
    const User = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };
    try {
      localStorage.setItem("User", JSON.stringify(User));
      navigate("/");
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
              ></TextField>
              <TextField
                name="Email"
                required
                placeholder="E-mail"
                value={userEmail}
                onChange={(event) => {
                  setUserEmail(event.target.value);
                }}
              ></TextField>
              <TextField
                name="Password"
                required
                placeholder="Password"
                value={userPassword}
                onChange={(event) => {
                  setUserPassword(event.target.value);
                }}
              ></TextField>
              <Button variant="outlined" type="submit">
                REGISTER
              </Button>
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
