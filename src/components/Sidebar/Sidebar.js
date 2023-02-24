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
import { Link, useLocation, useNavigate } from "react-router-dom";
import MoreMenu from "../MoreMenu/MoreMenu";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import { logoutUser } from "../../redux/actions/authActions";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [location] = React.useState(useLocation().pathname);
  const [moreActive, setMoreActive] = React.useState(false);
  const profile = useSelector((state) => state.user.profile);

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar">
      <FlutterDashIcon className="twitter-icon" />
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
      <Button onClick={handleLogout}>
        <SidebarItem text="Log Out" Icon={LogoutIcon} />
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
}

export default Sidebar;
