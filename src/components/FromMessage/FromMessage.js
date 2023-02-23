import Avatar from "react-avatar";
import React from "react";
import { MessageLikeIcon, MoreIcon } from "../icons";
import "./FromMessage.css";
const FromMessage = ({ message, userimage }) => {
  return (
    <div className="fromMessage">
      <Avatar src={userimage} />
      <div>
        <span>{message}</span>
      </div>
      <MessageLikeIcon />
      <MoreIcon />
    </div>
  );
};

export default FromMessage;
