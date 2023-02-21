import FlutterDash from "@mui/icons-material/FlutterDash";
import { Button, Grid, Typography } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { Box } from "@mui/system";
import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import errorPic from "../assets/NavigatingError.png";
import textBox from "../assets/textBox.png";
import shadow from "../assets/OvalShadow.png";

const NotFoundPage = () => {
  const accessToken = true;

  return (
    <>
      <Box container spacing={2} display={"flex"} justifyContent={"center"}>
        <Grid item xs={4}>
          <FlutterDash
            sx={{
              fontSize: 80,
              color: "#00d5bf",
              transform: "rotateY(180deg)",
              mt: 20,
              position: "relative",
              left: 50,
            }}
          />
          <Grid
            sx={{
              transform: "rotateX(240deg)",
              position: "relative",
              left: 50,
              bottom: 10,
            }}
          >
            <img src={shadow} width={80} height={50}></img>
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{ mr: 50 }}>
          <Typography
            fontSize={30}
            color={"gray"}
            fontFamily={"monospace"}
            sx={{
              transform: "rotate(357deg)",
              position: "relative",
              top: 65,
              left: 15,
            }}
          >
            Error 404!
          </Typography>
          <img src={textBox} width={200} height={100} />
        </Grid>
        <Grid item xs={4} sx={{ mt: 10 }}>
          <img src={errorPic} width={200} height={200} />
        </Grid>
      </Box>

      <Grid container spacing={4} padding={3}>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Typography
            fontSize={40}
            fontFamily={"monospace"}
            sx={{ color: "#7b847f" }}
          >
            Sorry, page not found...
          </Typography>
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Typography fontSize={15} fontFamily={"unset"} color={"#7b847f"}>
            We couldn't find the page you are looking for, or maybe it never
            existed. Try heading back to the main page.
          </Typography>
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Button
            size="large"
            variant="contained"
            sx={{
              backgroundColor: "#00d5bf",
              color: "white",
              "&:hover": {
                backgroundColor: "#00d5bf",
                color: "white",
                boxShadow: 5,
              },
            }}
            component={Link}
            to="/"
          >
            Main Page
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFoundPage;
