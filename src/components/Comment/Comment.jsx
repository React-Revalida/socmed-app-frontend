import { Avatar, Typography } from "@mui/material";
import React from "react";
import "../styles/Comment.css";

const Comment = () => {
  return (
    <div className="comment">
      <div className="comment__avatar">
        <Avatar
        // src = {avatar}
        />
      </div>
      <div className="comment__body">
        <div className="comment__header">
          <div className="comment__headerText">
            <h3>
              Test User
              {/* {displayName} */}
              <span className="comment__headerSpecial">
                {/* {verified && <VerifiedUserIcon className = "post__badge" />}
                            @{username} */}
              </span>
            </h3>
          </div>
          <div className="comment__headerDescription">
            <p>Test comment desc</p>
            {/* <p>{text}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
