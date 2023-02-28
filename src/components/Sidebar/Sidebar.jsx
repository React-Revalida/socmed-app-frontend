import React, { useEffect } from "react";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem/SidebarItem";
import {
  HomeIcon,
  MessagesIcon,
  UserIcon,
  SetTweetIcon,
  NotificationsIcon,
} from "../icons/index";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import LogoutDialog from "./LogoutDialog";
import { resetLoading } from "../../redux/actions/postActions";

import { logoutUser } from "../../redux/actions/authActions";
import * as profileActions from "../../redux/actions/profileActions";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [location] = React.useState(useLocation().pathname);
  const profile = useSelector((state) => state.user.profile);
  const [currLocation, setCurrentLocation] = React.useState(location);

  useEffect(() => {
    dispatch(profileActions.fetchProfile());
  }, [dispatch]);

  const handleLocationChange = (location) => {
    dispatch(resetLoading());
    setCurrentLocation(location);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpenLogoutDialog = (isOpen) => {
    setOpen(isOpen);
  };

  return (
    <>
      <LogoutDialog isDialogOpen={open} onOpenDialog={handleOpenLogoutDialog} />
      <div className="sidebar">
        <FlutterDashIcon className="twitter-icon" />
        <Link
          to="/home"
          style={{ textDecoration: "none" }}
          onClick={() => handleLocationChange("/home")}
        >
          <SidebarItem
            text="Home"
            Icon={HomeIcon}
            active={currLocation === "/home" && true}
          />
        </Link>
        <Link
          to="/messages"
          style={{ textDecoration: "none" }}
          onClick={() => handleLocationChange("/messages")}
        >
          <SidebarItem
            text="Chats"
            Icon={MessagesIcon}
            active={currLocation === "/messages" && true}
          />
        </Link>
        <Link
          to="/profile"
          style={{ textDecoration: "none" }}
          onClick={() => handleLocationChange("/profile")}
        >
          <SidebarItem
            text="Profile"
            Icon={UserIcon}
            active={currLocation === "/profile" && true}
          />
        </Link>
        <Button
          style={{
            textDecoration: "none",
            textTransform: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "flex-start",
          }}
          onClick={handleOpenLogoutDialog}
        >
          <SidebarItem text="Logout" Icon={LogoutIcon} />
        </Button>
        <div className="tweetButton" style={{ cursor: "pointer" }}>
          <SetTweetIcon className="setTweetIcon" />
          <span>Create Post</span>
        </div>
        <div className="profileCard">
          <div className="profileCardImage">
            <Avatar
              round={true}
              size={40}
              src={profile.profilePic}
              name={profile.name}
            />
          </div>
          <div className="profileCardNameCol">
            <div className="profileCardNameColName">
              <span>&nbsp;{profile.firstname}</span>
            </div>
            <div className="profileCardNameColuserName">
              <span>&nbsp;@{profile.username}</span>
            </div>
          </div>
          <div className="profileCardIcon">
            <MoreHorizIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
