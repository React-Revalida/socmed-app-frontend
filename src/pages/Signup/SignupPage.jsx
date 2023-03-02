import React from "react";
import { Box } from "@mui/material";
import SignupForm from "../../components/LoginSignup/SignupForm";
import Banner from "../../assets/gradient-bg-3.jpg";

const SignupPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${Banner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <SignupForm />
    </Box>
  );
};

export default SignupPage;
