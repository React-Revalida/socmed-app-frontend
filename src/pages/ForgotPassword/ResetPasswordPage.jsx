import React from "react";
import ResetPasswordForm from "../../components/ForgotPassword/ResetPasswordForm";
import Banner from "../../assets/gradient-bg-3.jpg";
import { Box } from "@mui/system";

const ResetPasswordPage = () => {
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
        backgroundColor: "var(--main-bg-color) !important",
      }}
    >
      <ResetPasswordForm />
    </Box>
  );
};

export default ResetPasswordPage;
