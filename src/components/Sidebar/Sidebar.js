import React from "react";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem/SidebarItem";
import {
  HomeIcon,
  MessagesIcon,
  UserIcon,
  SetTweetIcon,
  NotificationsIcon,
} from "../icons/index";
import TwitterIcon from "@mui/icons-material/Twitter";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useLocation } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";

function Sidebar() {
  const [location] = React.useState(useLocation().pathname);
  const profile = useSelector((state) => state.user.profile);
  const [currLocation, setCurrentLocation] = React.useState(location);

  const handleLocationChange = (location) => {
    setCurrentLocation(location);
  };
  return (
    <div className="sidebar">
      <TwitterIcon className="twitter-icon" />
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
      <Link to="/notifications" style={{ textDecoration: "none" }} onClick={() => handleLocationChange("/notifications")}>
        <SidebarItem
          text="Notifications"
          Icon={NotificationsIcon}
          active={currLocation === "/notifications" && true}
        />
      </Link>
      <Link to="/Messages" style={{ textDecoration: "none" }} onClick={() => handleLocationChange("/Messages")}>
        <SidebarItem
          text="Messages"
          Icon={MessagesIcon}
          active={currLocation === "/Messages" && true}
        />
      </Link>
      <Link to="/profile" style={{ textDecoration: "none" }} onClick={() => handleLocationChange("/profile")}>
        <SidebarItem
          text="Profile"
          Icon={UserIcon}
          active={currLocation === "/profile" && true}
        />
      </Link>
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
}

export default Sidebar;
