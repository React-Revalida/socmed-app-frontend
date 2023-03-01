import React from "react";
import { Outlet } from "react-router-dom";
import HomeBox from "../../HomeBox/HomeBox";

const SidebarWidgetLayout = (otherLoc) => {
  return (
    <HomeBox otherLoc={otherLoc}>
      <Outlet />
    </HomeBox>
  );
};

export default SidebarWidgetLayout;
