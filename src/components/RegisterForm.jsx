import React from "react";
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

const RegisterForm = () => {
  return (
    <>
      <Card
        sx={{
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 2,
          paddingBottom: 4,
          borderRadius: 4,
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
          <Box width={250}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              type={"password"}
              margin="dense"
              size="small"
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              type={"password"}
              margin="dense"
              size="small"
              fullWidth
            />
          </Box>
        </CardContent>
        <CardActions sx={{ padding: "15px" }}>
          <Button
            variant="contained"
            sx={{
              width: 250,
              backgroundColor: "#1DA1F2",
              borderRadius: 8,
            }}
          >
            Sign Up
          </Button>
        </CardActions>
        <Box marginTop={2} marginBottom={4} textAlign={"center"}>
          <Typography variant="caption" color={"#1DA1F2"}>
            Go to Login
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default RegisterForm;
