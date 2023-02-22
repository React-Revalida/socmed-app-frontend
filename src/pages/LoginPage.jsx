import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      sx={{ backgroundColor: "#999999", boxShadow: 3, borderRadius: 3 }}
    >
      <LoginForm />
    </Box>
=======
import "../styles/LoginPageStyle.css";

const LoginPage = () => {
  return (
    <>
      <body className="body">sfasss</body>
    </>
>>>>>>> Stashed changes
=======
import "../styles/LoginPageStyle.css";

const LoginPage = () => {
  return (
    <>
      <body className="body">sfasss</body>
    </>
>>>>>>> Stashed changes
  );
};

export default LoginPage;
