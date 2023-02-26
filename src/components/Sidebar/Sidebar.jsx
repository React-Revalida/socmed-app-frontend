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
    setCurrentLocation(location);
  };

  const handleLogout = () => {
    try {
      dispatch(logoutUser()).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        to="/notifications"
        style={{ textDecoration: "none" }}
        onClick={() => handleLocationChange("/notifications")}
      >
        <SidebarItem
          text="Notifications"
          Icon={NotificationsIcon}
          active={currLocation === "/notifications" && true}
        />
      </Link>
      <Link
        to="/Messages"
        style={{ textDecoration: "none" }}
        onClick={() => handleLocationChange("/Messages")}
      >
        <SidebarItem
          text="Messages"
          Icon={MessagesIcon}
          active={currLocation === "/Messages" && true}
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
        onClick={handleLogout}
      >
        <SidebarItem
          text="Logout"
          Icon={LogoutIcon}
          //active={currLocation === "/profile" && true}
        />
      </Button>
      <div className="tweetButton">
        <SetTweetIcon className="setTweetIcon" />
        <span>Tweet</span>
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
  );
};

export default Sidebar;
