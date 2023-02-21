import React from "react";
import "../styles/SidebarOpt.css";
import HomeIcon from "@mui/icons-material/Home";

const SidebarOpt = ({ active, text, Icon, onClick }) => {
  return (
    <>
      <div className={`sidebarOption ${active && "sidebarOption--active"}`} onClick={onClick}>
        <Icon />
        <h2>{text}</h2>
      </div>
    </>
  );
};

export default SidebarOpt;
