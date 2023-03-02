import Avatar from "react-avatar";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./FromMessage.css";
const FromMessage = ({ message, userimage, name }) => {
  return (
    <div className="fromMessage">
      <Avatar round={true} size={40} src={userimage} name={name} />
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default FromMessage;
