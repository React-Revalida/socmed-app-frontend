import { Avatar } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { forwardRef } from "react";
import "../styles/Post.css";
import Actions from "./Actions";

const Post = () => {
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
              Test
              {/* {displayName} */}
              <span className="post__headerSpecial">
                {/* {verified && <VerifiedUserIcon className = "post__badge" />}
                            @{username} */}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>Test post desc</p>
            {/* <p>{text}</p> */}
          </div>
        </div>
        <img
          // src = {image}
          alt=""
        />
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
