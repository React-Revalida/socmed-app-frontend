import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import "./Feed.css";
import TweetBox from "../components/TweetBox";
// import Post from './Post'
// import db from './firebase'
// import FlipMove from 'react-flip-move'

const Feed = () => {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <div className="feed">
        <div className="feed__header">
          <h2>Your Feed</h2>
        </div>

        <TweetBox />
        {/* <FlipMove> */}
        <Post />
        <Post />
        <Post />
        {/* {posts.map((post) => (
          <Post
          // key={post.text}
          // displayName={post.displayName}
          // username={post.username}
          // verified={post.verified}
          // text={post.text}
          // image={post.image}
          // avatar={post.avatar}
          />
        ))} */}
        {/* </FlipMove> */}
      </div>
    </>
  );
};

export default Feed;
