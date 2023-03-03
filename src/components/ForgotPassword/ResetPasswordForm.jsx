import React, { useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import Joi from "joi";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector, useStore } from "react-redux";
import { joiPasswordExtendCore } from "joi-password";
import jwtDecode from "jwt-decode";
import * as authActions from "../../redux/actions/authActions";
import mainLogo from "../../assets/SpillLogo.png";
import "./PasswordForm.css";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const resetToken = params.token;

  const [userDetails, setUserDetails] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const joiPassword = Joi.extend(joiPasswordExtendCore);
  const userDetailsSchema = Joi.object({
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required()
      .min(6)
      .max(20)
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password should be 6-20 characters",
        "string.min": "Password should be 6-20 characters",
        "password.minOfLowercase":
          "Password should contain at least 1 lowercase character",
        "password.minOfUppercase":
          "Password should contain at least 1 uppercase character",
        "password.minOfNumeric":
          "Password should contain at least 1 numeric character",
        "password.minOfSpecialCharacters":
          "Password should contain at least 1 special character",
        "password.noWhiteSpaces": "Password should not contain white spaces",
      }),
    confirmPassword: Joi.any()
      .required()
      .equal(Joi.ref("password"))
      .label("Confirm password")
      .messages({ "any.only": "Passwords does not match" }),
  });

  const [userDetailsFieldErrors, setUserDetailsFieldErrors] = React.useState(
    {}
  );

  const handleUserDetailsChange = ({ currentTarget: input }) => {
    setUserDetails({ ...userDetails, [input.name]: input.value });

    const { error } = userDetailsSchema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setUserDetailsFieldErrors({
        ...userDetailsFieldErrors,
        [input.name]: error.details[0].message,
      });
    } else {
      setUserDetailsFieldErrors({
        ...userDetailsFieldErrors,
        [input.name]: "",
      });
    }
  };

  const isFormInvalid = () => {
    let result = userDetailsSchema.validate(userDetails);
    return !!result.error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        authActions.resetPassword(resetToken, userDetails.password)
      ).then(() => {
        toast.success("Password reset successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      });
    } catch (error) {
      toast.error("Password reset failed");
    }
  };

  return (
    <>
      <Card
        sx={{
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 2,
          paddingBottom: 4,
          borderRadius: 4,
          width: 400,
          backgroundColor: "var(--main-bg-color) !important",
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
          title="Reset your password"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "var(--plain-text) !important",
          }}
        />
        <CardContent sx={{ marginBottom: 0 }}>
          <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                type={"password"}
                margin="dense"
                size="small"
                error={!!userDetailsFieldErrors.password}
                helperText={userDetailsFieldErrors.password}
                onChange={handleUserDetailsChange}
                fullWidth
                sx={{ color: "var(--plain-text) !important" }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                type={"password"}
                margin="dense"
                size="small"
                error={!!userDetailsFieldErrors.confirmPassword}
                helperText={userDetailsFieldErrors.confirmPassword}
                onChange={handleUserDetailsChange}
                fullWidth
                sx={{ color: "var(--plain-text) !important" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={isFormInvalid()}
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
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Box textAlign={"center"} marginTop={0}>
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

export default ResetPasswordForm;
