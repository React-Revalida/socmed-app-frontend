import React from "react";
import { Box } from "@mui/material";
import SignupForm from "../../components/LoginSignup/SignupForm";

const SignupPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      sx={{ backgroundColor: "#999999", boxShadow: 3, borderRadius: 3 }}
    >
      <SignupForm />
    </Box>
  );
};

export default SignupPage;
