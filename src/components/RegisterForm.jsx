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
import { Grid } from "@mui/material";
import { Label } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";

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
          <FlutterDashIcon sx={{ color: "#00d5bf" }} />
        </Box>

        <CardHeader
          title="Create an account"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        />
        <CardContent sx={{ marginBottom: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                margin="dense"
                size="small"
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
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select options={genderOptions} menuPlacement={"auto"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button fullWidth>
                <UploadIcon sx={{ color: "#00d5bf" }}>
                  <Input type="file" />
                </UploadIcon>
                <Typography variant="caption" color={"#00d5bf"}>
                  Upload Profile Picture
                </Typography>
              </Button>
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
    </>
  );
};

export default RegisterForm;
