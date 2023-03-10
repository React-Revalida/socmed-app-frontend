import React from "react";
import "./SidebarItem.css";

const SidebarItem = ({ Icon, text, active }) => {
  return (
    <div className={`sidebarItem ${active && "sidebarItem--active"}`}>
      <Icon className="sidebaricon" />
      <span>{text}</span>
    </div>
  );
};

export default SidebarItem;
