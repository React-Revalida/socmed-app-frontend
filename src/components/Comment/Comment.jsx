import Avatar from "react-avatar";
import React from "react";
import { MillToDate } from "../../utils/MillToDate";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router";

const Comment = ({ comment }) => {
  const navigate = useNavigate();

  return (
    <div className="post">
      <div className="comment__avatar">
        <div>
          <Avatar
            src={comment.user.profilePic}
            name={comment.user.name}
            round={true}
            size={40}
            style={{ margin: 10, cursor: "pointer" }}
            onClick={() => navigate(`/profile/${comment.user.username}`)}
          />
        </div>
      </div>
      <div className="post-content-col">
        <div className="post-header">
          <span
            className="post-header-displayname"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/profile/${comment.user.username}`);
            }}
          >
            {comment.user.name}
          </span>
          <span className="post-header-username">
            {"@" + comment.user.username}
          </span>
          <span className="post-header-date">
            {MillToDate(comment.timestamp)}
          </span>
        </div>
        <CardActionArea>
          <div className="post-content">{comment.message}</div>
        </CardActionArea>
        <div className="post-event">
          <div></div>
        </div>
      </div>
      {/* <div className="comment__body">
        <div className="comment__header">
          <div className="comment__headerText">
            <h3>
              {comment.user.name}
              <span className="comment__headerSpecial">
              </span>
            </h3>
          </div>
          <div className="comment__headerDescription">
            <p>{comment.message}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Comment;
