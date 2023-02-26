import React from "react";
import "./NotSelectedMessage.css";
const NotSelectedMessage = () => {
  return (
    <div className="notSelectedMessage">
      <span>You don’t have a message selected</span>
      <span>Choose one from your mutual followers to start conversation.</span>
    </div>
  );
};

export default NotSelectedMessage;
