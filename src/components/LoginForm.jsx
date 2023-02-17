import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import React from "react";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Button, CardActions, TextField } from "@mui/material";
import { Box, fontWeight, textAlign } from "@mui/system";

const LoginForm = () => {
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
          title="Login to OnlyPosts"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        />
        <CardContent>
          <Box width={250}>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type={"password"}
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
            Log In
          </Button>
        </CardActions>
        <Box marginBottom={3}>
          <Typography variant="caption" color={"#1DA1F2"} marginLeft={"15px"}>
            Forgot password?
          </Typography>
        </Box>
        <Box marginBottom={4}>
          <Typography variant="caption" marginLeft={"15px"}>
            Don't have an account yet? &nbsp;
          </Typography>
          <Typography variant="caption" color={"#1DA1F2"}>
            Sign up here.
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default LoginForm;
