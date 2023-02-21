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
import { Link } from "react-router-dom";
import Select from "react-select";

const RegisterForm = () => {
  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Prefer not to say" },
  ];

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
          <FlutterDashIcon />
        </Box>

        <CardHeader
          title="Create an account"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        />
        <CardContent>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                margin="dense"
                size="small"
                sx={{ width: "200", marginRight: 1 }}
              />
              <TextField
                name="middleName"
                label="Middle Name"
                variant="outlined"
                margin="dense"
                size="small"
                sx={{ width: "200", marginRight: 1 }}
              />
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                margin="dense"
                size="small"
                sx={{ width: "200" }}
              />
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                type={"password"}
                margin="dense"
                size="small"
                sx={{ marginRight: 1, width: 340 }}
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                margin="dense"
                size="small"
                sx={{ width: 340 }}
              />
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                type={"password"}
                margin="dense"
                size="small"
                sx={{ marginRight: 1, width: 340 }}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                type={"password"}
                margin="dense"
                size="small"
                sx={{ width: 340 }}
              />
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box width={340}>
                <Select
                  name="gender"
                  options={genderOptions}
                  placeholder="Gender"
                />
              </Box>
              <Box width={340}>
                <Typography variant="overline">Profile Photo</Typography>
                <Input type="file" />
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
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
            Sign Up
          </Button>
        </CardActions>
        <Box textAlign={"center"}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography variant="caption" color={"#00d5bf"}>
              Go to Login
            </Typography>
          </Link>
        </Box>
      </Card>
    </>
  );
};

export default RegisterForm;
