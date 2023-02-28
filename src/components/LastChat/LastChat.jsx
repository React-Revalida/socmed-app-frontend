
import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { VerifiedIcon } from "../icons";
import "./LastChat.css";

const LastChat = ({
  displayName,
  username,
  userimage,
  datetime,
  lastMessage,
  verified,
  onChoose
}) => {
  return (
    <Link className="lastChat" to={`/messages/${username}`} onClick={() => onChoose(username)}>
      <div>
        <Avatar size={40} round={true} src={userimage} name={displayName} />
      </div>
      <div>
        <div>
          <span>
            {displayName}
          </span>
          <span>@{username}</span>
        </div>
      </div>
    </Link>
  );
};

export default LastChat;
