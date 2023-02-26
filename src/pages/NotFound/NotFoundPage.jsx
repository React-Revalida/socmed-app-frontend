import FlutterDash from "@mui/icons-material/FlutterDash";
import { Button, Grid, Typography } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { Box } from "@mui/system";
import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import errorPic from "../../assets/NavigatingError.png";
import textBox from "../../assets/textBox.png";
import shadow from "../../assets/OvalShadow.png";

const NotFoundPage = () => {
  const accessToken = true;

  return (
    <>
      <Grid
        container
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
        marginTop={10}
      >
        <Grid
          item
          xs={8}
          md={4}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginBottom={4}
        >
          <FlutterDash
            sx={{
              fontSize: 80,
              color: "#00d5bf",
              transform: "rotateY(180deg)",
              position: "relative",
              left: 40,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              transform: "rotateX(240deg)",
              position: "relative",
              top: 55,
              right: 45,
            }}
          >
            <img src={shadow} width={80} height={50}></img>
          </div>
          <div
            style={{
              position: "relative",
              bottom: 100,
              right: 75,
            }}
          >
            <Typography
              fontSize={30}
              color={"white"}
              fontFamily={"monospace"}
              sx={{
                transform: "rotate(357deg)",
                position: "relative",
                top: 60,
                left: 15,
              }}
            >
              Error 404!
            </Typography>
            <img src={textBox} width={200} height={100} />
          </div>
        </Grid>
        <Grid
          item
          xs={8}
          md={4}
          display={"flex"}
          justifyContent={"center"}
          marginBottom={4}
        >
          <img src={errorPic} width={200} height={200} />
        </Grid>
      </Grid>

      <Grid container spacing={4} padding={3}>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Typography
            fontSize={30}
            fontFamily={"monospace"}
            sx={{ color: "white" }}
          >
            Sorry, page not found...
          </Typography>
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Typography fontSize={15} fontFamily={"unset"} color={"white"}>
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
              borderRadius: 6,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#00d5bf",
                color: "white",
                boxShadow: 5,
              },
            }}
            component={Link}
            to="/home"
          >
            Back to Main
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFoundPage;
