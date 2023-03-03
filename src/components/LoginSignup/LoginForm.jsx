import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React, { useEffect } from "react";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Button, CardActions, TextField } from "@mui/material";
import { Box, fontWeight, textAlign } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { toast, ToastContainer } from "react-toastify";
import Joi from "joi";
import Follow from "../../assets/calm.png";
import mainLogo from "../../assets/SpillLogo.png";
import "./LoginSignup.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginFieldErrors, setLoginFieldErrors] = React.useState({});

  const loginSchema = Joi.object({
    username: Joi.string().required().messages({
      "string.empty": "Username/email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
    }),
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }

    const error = loginSchema.extract(name).label(name).validate(value).error;

    if (error) {
      setLoginFieldErrors({
        ...loginFieldErrors,
        [name]: error.details[0].message,
      });
    } else {
      setLoginFieldErrors({ ...loginFieldErrors, [name]: "" });
    }
  };

  const isFormInvalid = () => {
    let result = loginSchema.validate({ username, password });
    return !!result.error;
  };

  const handleSubmit = () => {
    try {
      dispatch(loginUser(username, password))
        .then(() => {
          if (localStorage.getItem("accessToken")) {
            navigate("/home");
          } else {
            toast("Invalid username and/or password");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        color="var(--main-bg-color)"
        sx={{
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 2,
          paddingBottom: 4,
          borderRadius: 4,
          backgroundColor: "var(--main-bg-color)",
        }}
      >
        <Box textAlign={"center"}>
          <img
            src={mainLogo}
            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="Spill"
            loading="lazy"
            className="login-icon"
          />
        </Box>

        <CardHeader
          color
          title="Login to Spill"
          sx={{ textAlign: "center", color: "var(--plain-text) !important" }}
        />
        <CardContent>
          <Box width={250}>
            <TextField
              name="username"
              label="Username/Email"
              variant="outlined"
              margin="normal"
              size="small"
              error={!!loginFieldErrors.username}
              helperText={loginFieldErrors.username}
              onChange={handleLoginChange}
              fontFamily={"Poppins"}
              fullWidth
              sx={{ color: "var(--plain-text) !important" }}
            />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type={"password"}
              size="small"
              onChange={handleLoginChange}
              error={!!loginFieldErrors.password}
              helperText={loginFieldErrors.password}
              fullWidth
              sx={{ color: "var(--plain-text) !important" }}
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
              backgroundColor: "var(--gray)!important",
              borderRadius: 8,
              ":hover": {
                backgroundColor: "var(--gray)!important",
              },
            }}
          >
            Log In
          </Button>
        </CardActions>
        <Box marginBottom={3}>
          <Link to="/forgot-password" style={{ textDecoration: "none" }}>
            <Typography
              variant="caption"
              color={"#00d5bf"}
              marginLeft={"15px"}
              fontFamily={"Poppins"}
            >
              Forgot password?
            </Typography>
          </Link>
        </Box>
        <Box marginBottom={4}>
          <Typography
            variant="caption"
            marginLeft={"15px"}
            fontFamily={"Poppins"}
            sx={{ color: "var(--plain-text) !important" }}
          >
            Don't have an account yet? &nbsp;
          </Typography>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Typography
              variant="caption"
              color={"#00d5bf"}
              fontFamily={"Poppins"}
            >
              Sign up here.
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

export default LoginForm;
