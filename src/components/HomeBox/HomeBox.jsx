import React from "react";
import "./HomeBox.css";
import Sidebar from "../Sidebar/Sidebar";

const HomeBox = ({ children, otherLoc }) => {
  return (
    <div className="home">
      <Sidebar otherLoc={otherLoc} />
      <div className="homeBox">{children}</div>
    </div>
  );
};

export default HomeBox;
