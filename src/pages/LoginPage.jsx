import React from "react";
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
  );
};

export default LoginPage;
