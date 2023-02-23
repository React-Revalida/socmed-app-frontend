import React from "react";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem/SidebarItem";
import {
  HomeIcon,
  MessagesIcon,
  ListIcon,
  UserIcon,
  ExploreIcon,
  SetTweetIcon,
  NotificationsIcon,
  BookmarkIcon,
  MoreIcon,
} from "../icons/index";
import TwitterIcon from "@mui/icons-material/Twitter";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useLocation } from "react-router-dom";
import MoreMenu from "../MoreMenu/MoreMenu";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";

function Sidebar() {
  const [location] = React.useState(useLocation().pathname);
  const [moreActive, setMoreActive] = React.useState(false);
  const profile = useSelector((state) => state.user.profile);
  return (
    <div className="sidebar">
      <TwitterIcon className="twitter-icon" />
      <Link to="/home" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Home"
          Icon={HomeIcon}
          active={location === "/home" && true}
        />
      </Link>
      <Link to="/notifications" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Notifications"
          Icon={NotificationsIcon}
          active={location === "/notifications" && true}
        />
      </Link>
      <Link to="/Messages" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Messages"
          Icon={MessagesIcon}
          active={location === "/Messages" && true}
        />
      </Link>
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <SidebarItem
          text="Profile"
          Icon={UserIcon}
          active={location === "/profile" && true}
        />
      </Link>
      <div className="tweetButton">
        <SetTweetIcon className="setTweetIcon" />
        <span>Tweet</span>
      </div>
      <div className="profileCard">
        <div className="profileCardImage">
          <Avatar round={true} size={40} src={profile.profilePic} name={profile.name} />
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
