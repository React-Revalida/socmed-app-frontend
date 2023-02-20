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
// import Post from './Post'
// import db from './firebase'
// import FlipMove from 'react-flip-move'

const Feed = () => {
  const { darkMode, onToggleDarkMode } = useContext(UserInterfaceContext);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

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
        <Card sx={{ boxShadow: 0 }}>
          <CardActionArea onClick={() => navigate("/post")}>
            <Post />
          </CardActionArea>
        </Card>
        <Card sx={{ boxShadow: 0 }}>
          <CardActionArea onClick={() => navigate("/post")}>
            <Post />
          </CardActionArea>
        </Card>
        <Card sx={{ boxShadow: 0 }}>
          <CardActionArea onClick={() => navigate("/post")}>
            <Post />
          </CardActionArea>
        </Card>
        {/* 
        <Post />
        <Post />
        <Post /> */}
        {posts.map((post) => (
          <Post
          // key={post.text}
          // displayName={post.displayName}
          // username={post.username}
          // verified={post.verified}
          // text={post.text}
          // image={post.image}
          // avatar={post.avatar}
          />
        ))}
        {/* </FlipMove> */}
      </div>
    </>
  );
};

export default Feed;
