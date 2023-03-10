import React from "react";
import "./FollowedYou.css";
import UserIcon from "../icons/UserIcon";
import Avatar from "react-avatar";

const FollowedYou = ({ followingUser }) => {
  return (
    <div className="followedYou">
      <UserIcon className="followedYouIcon" />
      <div>
        <Avatar src={followingUser.userImage} />
        <span>
          <b>{followingUser.displayName}</b> followed you
        </span>
      </div>
    </div>
  );
};

export default FollowedYou;
