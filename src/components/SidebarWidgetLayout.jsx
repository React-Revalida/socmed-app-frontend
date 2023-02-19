import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import { Container } from "@mui/material";
import { Stack } from "@mui/system";

const SidebarWidgetLayout = () => {
  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Outlet />
      <Widget />
    </Stack>
  );
};

export default SidebarWidgetLayout;
