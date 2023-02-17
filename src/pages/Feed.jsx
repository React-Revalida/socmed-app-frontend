import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import "../styles/Feed.css";
import TweetBox from "../components/TweetBox";
import {
  Button,
  Card,
  CardActionArea,
  Container,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import Post from './Post'
// import db from './firebase'
// import FlipMove from 'react-flip-move'

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  return (
    <>
      <div className="feed">
        <div className="feed__header">
          <h2>Your Feed</h2>
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
