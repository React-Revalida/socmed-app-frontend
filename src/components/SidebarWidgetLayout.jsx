import React from "react";
import { Outlet } from "react-router-dom";
import HomeBox from "./HomeBox/HomeBox";

const SidebarWidgetLayout = () => {
  return (
    <HomeBox>
      <Outlet />
    </HomeBox>
  );
};

export default SidebarWidgetLayout;
