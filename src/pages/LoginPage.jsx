import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import LoginForm from "../components/LoginSignup/LoginForm";

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
  );
};

export default LoginPage;
