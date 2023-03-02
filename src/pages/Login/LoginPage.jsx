import { Box } from "@mui/system";
import React from "react";
import LoginForm from "../../components/LoginSignup/LoginForm";
import Banner from "../../assets/gradient-bg-1.jpg";

const LoginPage = () => {
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
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
