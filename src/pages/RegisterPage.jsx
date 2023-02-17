import React from "react";
import { Box } from "@mui/material";
import LoginForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
      <LoginForm />
    </Box>
  );
};

export default RegisterPage;
