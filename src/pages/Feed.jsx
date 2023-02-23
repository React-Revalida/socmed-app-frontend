import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import "../styles/Feed.css";
import TweetBox from "../components/TweetBox";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Button,
  Card,
  CardActionArea,
  Container,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserInterfaceContext } from "../contexts/UserInterfaceContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/actions/profileActions";
import * as postActions from "../redux/actions/postActions";
// import Post from './Post'
// import db from './firebase'
// import FlipMove from 'react-flip-move'

const Feed = () => {
  const { darkMode, onToggleDarkMode } = useContext(UserInterfaceContext);
  // const [posts, setPosts] = useSelector((state) => state.post.posts);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //dispatch(fetchProfile());

  useEffect(() => {
    dispatch(postActions.fetchPosts());
  }, [dispatch]);

  const loading = useSelector((state) => state.post.loading);
  const posts = useSelector((state) => state.post.posts);

  if (posts.length === undefined) {
    console.log(posts.length === undefined);
  } else {
    posts.map((posts) => console.log(posts));
  }

  return (
    <>
      <div className="feed">
        <div className="feed__header">
          <h2 className="inline">Your Feed</h2>

          <IconButton
            className="inline"
            sx={{ ml: 1 }}
            onClick={onToggleDarkMode}
            color="inherit"
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
        <TweetBox />
        {/* <FlipMove> */}
        {/*test for clicking post*/}
        {/* <CardActionArea onClick={() => navigate("/post")}>
          <Post />
        </CardActionArea>
        <CardActionArea onClick={() => navigate("/post")}>
          <Post />
        </CardActionArea>
        <CardActionArea onClick={() => navigate("/post")}>
          <Post />
        </CardActionArea> */}
        {/* 
        <Post />
        <Post />
        <Post /> */}
        {posts.length === undefined ? (
          <div>Loading...</div>
        ) : (
          posts.map((post) => <Post key={post.postId} post={post} />)
        )}
        {/* </FlipMove> */}
      </div>
    </>
  );
};

export default Feed;
