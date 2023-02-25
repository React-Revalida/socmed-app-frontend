import { ArrowBack } from "@mui/icons-material";
import { Card, Grid, IconButton, TableRow, Typography } from "@mui/material";
import { padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import Post from "../../components/Feed/Post/Post";
import "../../components/Feed/Post/Post.css";
import Loading from "../../components/Loading/Loading";
import * as postActions from "../../redux/actions/postActions";

const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(postActions.fetchPostById(params.postId));
  }, [dispatch]);

  const loading = useSelector((state) => state.post.loading);
  console.log(loading);

  const post = useSelector((state) => state.post.post);

  console.log(post);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              <Post post={post} />
              <Typography
                color={"gray"}
                fontStyle="oblique"
                fontSize={12}
                ml={1}
              >
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
      )}
    </>
  );
};

export default PostPage;
