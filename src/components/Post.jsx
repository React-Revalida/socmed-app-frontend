import { Avatar } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { forwardRef } from "react";
import "../styles/Post.css";
import Actions from "./Actions";

const Post = (post) => {
  console.log(post.post);

  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar
        // src = {avatar}
        />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {/* Test */}
              {post.post.user.firstname + " " + post.post.user.lastname}
              <span className="post__headerSpecial">
                &ensp;
                {post.post.user.isValidated && (
                  <VerifiedUserIcon className="post__badge" />
                )}
                &ensp;@
                {post.post.user.username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            {/* <p>Test post desc</p> */}
            <p>{post.post.message}</p>
          </div>
        </div>
        <img src={post.post.imageUrl} alt="" />
        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div>Post</div>
  //     <Actions />
  //   </>
  // );
};

export default Post;
