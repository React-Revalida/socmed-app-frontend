import Avatar from "react-avatar";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./FromMessage.css";
const FromMessage = ({ message, userimage }) => {
  return (
    <div className="fromMessage">
      <Avatar round={true} size={40} src={userimage} name={userimage} />
      <div>
        <span>{message}</span>
      </div>
      <FavoriteBorderIcon />
      <MoreHorizIcon />
    </div>
  );
};

export default FromMessage;
