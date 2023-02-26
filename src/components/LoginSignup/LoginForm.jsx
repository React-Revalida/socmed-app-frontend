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
          <FlutterDashIcon sx={{ color: "#00d5bf" }} />
        </Box>

        <CardHeader
          title="Login to OnlyPosts"
          sx={{ fontWeight: "bold", textAlign: "center" }}
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
              fullWidth
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
            />
          </Box>
        </CardContent>
        <CardActions sx={{ padding: "15px" }}>
          <Button
            onClick={handleSubmit}
            disabled={isFormInvalid()}
            variant="contained"
            sx={{
              width: 250,
              backgroundColor: "#00d5bf",
              borderRadius: 8,
              ":hover": {
                backgroundColor: "#00d5bf",
              },
            }}
          >
            Log In
          </Button>
        </CardActions>
        <Box marginBottom={3}>
          <Link to="/forgot-password" style={{ textDecoration: "none" }}>
            <Typography variant="caption" color={"#00d5bf"} marginLeft={"15px"}>
              Forgot password?
            </Typography>
          </Link>
        </Box>
        <Box marginBottom={4}>
          <Typography variant="caption" marginLeft={"15px"}>
            Don't have an account yet? &nbsp;
          </Typography>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Typography variant="caption" color={"#00d5bf"}>
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
