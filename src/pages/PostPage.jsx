import { ArrowBack } from "@mui/icons-material";
import { Card, Grid, IconButton, TableRow, Typography } from "@mui/material";
import { padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comment from "../components/Comment";
import Post from "../components/Post";
import "../styles/Post.css";

const PostPage = (postDetails) => {
  const navigate = useNavigate();

  return (
    <div className="post">
      <Grid container>
        <Grid item xs={1}>
          <IconButton>
            <ArrowBack onClick={() => navigate("/")} />
          </IconButton>
        </Grid>
        <Grid item xs={1} sx={{ mt: 0.5 }}>
          <Typography fontFamily="'Segoe UI'" fontSize={22}>
            Feeds
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Post //{postDetails}
          />
          <Typography color={"gray"} fontStyle="oblique" fontSize={12} ml={1}>
            Test Timestamp: {/*postTimestamp*/}2:23 PM · February 17, 2023{" "}
            <br />
            Test: 26{/*totalComments*/} comments · 130{/*totalLikes*/} likes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className="component__top__border">
            <Comment />

            <Comment />

            <Comment />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostPage;
