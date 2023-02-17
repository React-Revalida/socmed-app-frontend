import { ArrowBack } from "@mui/icons-material";
import { Card, Grid, IconButton, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comment from "../components/Comment";
import Post from "../components/Post";

const PostPage = (postDetails) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <IconButton>
          <ArrowBack onClick={() => navigate("/")} />
        </IconButton>
      </Grid>
      <Grid item xs={1} sx={{ mt: 0.5 }}>
        <Typography color={"gray"} fontSize={22}>
          Feeds
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Post //{postDetails}
          />
          <Typography color={"gray"} fontSize={12}>
            Test Timestamp: {/*postTimestamp*/}2:23 PM · February 17, 2023{" "}
            <br />
            Test: 26{/*totalComments*/} comments · 130{/*totalLikes*/} likes
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Comment />
        </Card>
        <Card>
          <Comment />
        </Card>
        <Card>
          <Comment />
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostPage;
