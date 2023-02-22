import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import { Container } from "@mui/material";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";

const SidebarWidgetLayout = () => {
  //const token = useSelector((state) => state.user.accessToken);
  //console.log("accessToken", token);

  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Outlet />
      <Widget />
    </Stack>
  );
};

export default SidebarWidgetLayout;
