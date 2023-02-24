import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Grid } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import Joi from "joi";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../redux/actions/authActions";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const navigate = useNavigate();

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Prefer not to say" },
  ];

  const [userDetails, setUserDetails] = React.useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [profilePic, setProfilePic] = React.useState(null);
  const userDetailsSchema = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string().allow(""),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
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

  const handleFileUpload = (event) => {
    setProfilePic(event.target.files[0]);
  };

  const isFormInvalid = () => {
    let result = userDetailsSchema.validate(userDetails);
    return !!result.error;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authActions.signUpUser(userDetails, profilePic));
    if (isRegistered) {
      toast.success("Registered Successfully");
      navigate("/login");
    } else {
      toast.error("Registration Failed! Please try again");
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
          width: 800,
        }}
      >
        <Box textAlign={"center"}>
          <FlutterDashIcon sx={{ color: "#00d5bf" }} />
        </Box>

        <CardHeader
          title="Create an account"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        />
        <CardContent sx={{ marginBottom: 0 }}>
          <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                margin="dense"
                size="small"
                error={!!userDetailsFieldErrors.firstName}
                helperText={userDetailsFieldErrors.firstName}
                onChange={handleUserDetailsChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="middleName"
                label="Middle Name"
                variant="outlined"
                margin="dense"
                size="small"
                error={!!userDetailsFieldErrors.middleName}
                helperText={userDetailsFieldErrors.middleName}
                onChange={handleUserDetailsChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                margin="dense"
                size="small"
                error={!!userDetailsFieldErrors.lastName}
                helperText={userDetailsFieldErrors.lastName}
                onChange={handleUserDetailsChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                margin="dense"
                size="small"
                error={!!userDetailsFieldErrors.username}
                helperText={userDetailsFieldErrors.username}
                onChange={handleUserDetailsChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                margin="dense"
                size="small"
                error={!!userDetailsFieldErrors.email}
                helperText={userDetailsFieldErrors.email}
                onChange={handleUserDetailsChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select options={genderOptions} menuPlacement={"auto"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input type="file" fullWidth onChange={handleFileUpload}>
                <UploadIcon sx={{ color: "#00d5bf" }} />
                <Typography variant="caption" color={"#00d5bf"}>
                  Upload Profile Picture
                </Typography>
              </Input>
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
                  width: 250,
                  backgroundColor: "#00d5bf",
                  borderRadius: 8,
                  ":hover": {
                    backgroundColor: "#00d5bf",
                  },
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Box textAlign={"center"} marginTop={0}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography variant="caption" color={"#00d5bf"}>
              Go to Login
            </Typography>
          </Link>
        </Box>
      </Card>
      <ToastContainer />
    </>
  );
};

export default RegisterForm;
