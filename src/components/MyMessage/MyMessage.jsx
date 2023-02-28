import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./MyMessage.css";

const MyMessage = ({ message }) => {
  return (
    <div className="myMessage">
      <FavoriteBorderIcon />
      <MoreHorizIcon />
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default MyMessage;
