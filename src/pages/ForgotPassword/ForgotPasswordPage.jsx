import React from "react";
import { Box } from "@mui/system";
import ForgotPasswordForm from "../../components/ForgotPassword/ForgotPasswordForm";
import Banner from "../../assets/socmed-banner-2-min.jpg";

const ForgotPasswordPage = () => {
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
      <ForgotPasswordForm />
    </Box>
  );
};

export default ForgotPasswordPage;
