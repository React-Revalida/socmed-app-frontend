import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Joi from "joi";
import * as authActions from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import mainLogo from "../../assets/SpillLogo.png";
import "./PasswordForm.css";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const emailSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu"] } })
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Input must be a valid email",
      }),
  });
  const [emailFieldErrors, setEmailFieldErrors] = React.useState("");

  const handleEmailChange = ({ currentTarget: input }) => {
    setEmail(input.value);
    let result = emailSchema.validate({ email: input.value });
    if (result.error) {
      setEmailFieldErrors(result.error.details[0].message);
    } else {
      setEmailFieldErrors("");
    }
  };

  const isFormInvalid = () => {
    return emailFieldErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(authActions.generateResetPasswordToken(email)).then(() => {
        if (localStorage.getItem("resetToken")) {
          window.Email.send({
            Host: process.env.REACT_APP_EMAIL_CLIENT_HOST,
            Username: process.env.REACT_APP_EMAIL_CLIENT_USERNAME,
            Password: process.env.REACT_APP_EMAIL_CLIENT_PASSWORD,
            To: email,
            From: process.env.REACT_APP_EMAIL_CLIENT_USERNAME,
            Subject: "Password Reset Link",
            Body: `Please click on the link below to reset your password: http://localhost:3000/reset-password/${localStorage.getItem(
              "resetToken"
            )}`,
          }).then((message) => {
            console.log(message);
          });
          toast.success("Please check your email for password reset link");
        } else {
          toast.error("Email not found");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        color="red"
        sx={{
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 2,
          paddingBottom: 4,
          borderRadius: 4,
        }}
      >
        <Box textAlign={"center"}>
          <img
            src={mainLogo}
            alt="Spill"
            loading="lazy"
            className="password-form-icon"
          />
        </Box>

        <CardHeader
          title="Forgot password?"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        />
        <CardContent>
          <Box width={250}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              size="small"
              error={!!emailFieldErrors}
              helperText={emailFieldErrors}
              onChange={handleEmailChange}
              fullWidth
            />
          </Box>
        </CardContent>
        <CardActions sx={{ padding: "15px" }}>
          <Button
            onClick={handleSubmit}
            disabled={isFormInvalid()}
            variant="contained"
            sx={{
              fontFamily: "Poppins",
              width: 250,
              backgroundColor: "#00d5bf",
              borderRadius: 8,
              ":hover": {
                backgroundColor: "#00d5bf",
              },
            }}
          >
            Send reset link
          </Button>
        </CardActions>
        <Box marginBottom={4} textAlign={"center"}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography
              variant="caption"
              color={"#00d5bf"}
              fontFamily={"Poppins"}
            >
              Go to Login
            </Typography>
          </Link>
        </Box>
      </Card>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default ForgotPasswordForm;
