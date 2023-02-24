import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
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
import { CustomSelect } from "../custom/CustomFieldComponents";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleGenderClose = () => {
    setOpen(false);
  };

  const handleGenderOpen = () => {
    setOpen(true);
  };

  const [userDetails, setUserDetails] = React.useState({
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  const [profilePic, setProfilePic] = React.useState(null);
  const userDetailsSchema = Joi.object({
    firstname: Joi.string().required(),
    middlename: Joi.string().allow(""),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(6).required(),
    // confirmPassword: Joi.any()
    //   .equal(Joi.ref("password"))
    //   .required()
    //   .label("Confirm password")
    //   .messages({ "any.only": "Passwords does not match" }),
    gender: Joi.string().required(),
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
                name="firstname"
                label="First Name"
                variant="outlined"
                margin="dense"
                size="small"
                error={!!userDetailsFieldErrors.firstname}
                helperText={userDetailsFieldErrors.firstname}
                onChange={handleUserDetailsChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="middlename"
                label="Middle Name"
                variant="outlined"
                margin="dense"
                size="small"
                error={!!userDetailsFieldErrors.middlename}
                helperText={userDetailsFieldErrors.middlename}
                onChange={handleUserDetailsChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="lastname"
                label="Last Name"
                variant="outlined"
                margin="dense"
                size="small"
                error={!!userDetailsFieldErrors.lastname}
                helperText={userDetailsFieldErrors.lastname}
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
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="gender">Gender</InputLabel>
                <CustomSelect
                  labelId="gender"
                  id="gender"
                  open={open}
                  onClose={handleGenderClose}
                  onOpen={handleGenderOpen}
                  value={userDetails.gender}
                  label="Gender"
                  onChange={(event) => {
                    setUserDetails({
                      ...userDetails,
                      gender: event.target.value,
                    });
                  }}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="OTHERS">Others</MenuItem>
                </CustomSelect>
              </FormControl>
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
