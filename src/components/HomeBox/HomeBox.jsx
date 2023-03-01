import React from "react";
import "./HomeBox.css";
import Sidebar from "../Sidebar/Sidebar";

const HomeBox = ({ children, otherLoc, appTheme, switchTheme }) => {
  return (
    <div className="home">
      <Sidebar appTheme switchTheme otherLoc={otherLoc} />
      <div className="homeBox">{children}</div>
    </div>
  );
};

export default HomeBox;
