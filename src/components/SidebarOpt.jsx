import React from "react";
import "./SidebarOpt.css";
import HomeIcon from "@mui/icons-material/Home";

const SidebarOpt = ({ active, text, Icon }) => {
  return (
    <>
      <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
        <Icon />
        <h2>{text}</h2>
      </div>
    </>
  );
};

export default SidebarOpt;
