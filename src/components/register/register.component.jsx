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
import React, { Fragment } from "react";
import Image from "../../assets/annie-spratt-0ZPSX_mQ3xI-unsplash.jpg"

const Register = () => {
  return (
    <Box sx={{ height: "100vh",backgroundImage:`url(${Image})`,backgroundPosition:'center',backgroundSize:'cover' }} >
      <Stack justifyContent="center" alignItems="center">
        <Card sx={{margin:" calc(100vh - 80vh) auto"}}>
          <CardHeader sx={{paddingTop:"32px"}} title="Register you account with us!"></CardHeader>
          <CardContent>
            <Stack spacing={2}>
              <TextField required placeholder="Name"></TextField>
              <TextField required placeholder="E-mail"></TextField>
              <TextField required placeholder="Password"></TextField>
              <Button variant="outlined" >REGISTER</Button>
            </Stack>
            <Divider sx={{ paddingTop: "16px" }} variant="fullWidth">
              or Continue with
            </Divider>
            <Box textAlign="center" paddingTop="16px" paddingBottom="32px">
              <Apple fontSize="large"></Apple>
              <GitHub fontSize="large" ></GitHub>
              <Google fontSize="large" ></Google>
              <FacebookRounded fontSize="large" ></FacebookRounded>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default Register;
