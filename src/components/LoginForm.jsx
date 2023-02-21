import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { Button, CardActions, TextField } from "@mui/material";
import { Box, fontWeight, textAlign } from "@mui/system";
import { Link } from "react-router-dom";

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
              label="Username/Email"
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
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Typography variant="caption" color={"#00d5bf"}>
              Sign up here.
            </Typography>
          </Link>
        </Box>
      </Card>
    </>
  );
};

export default LoginForm;
