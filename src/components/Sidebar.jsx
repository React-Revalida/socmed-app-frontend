import React, { useContext } from "react";
import "../styles/Sidebar.css";
import OnlyPost from "../assets/onlyposts.png";
import PushPinIcon from "@mui/icons-material/PushPin";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOpt from "./SidebarOpt";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import * as authService from "../services/auth";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__twitterIcon">
        <PushPinIcon className="icon" />
        <h3>OnlyPosts</h3>
      </div>

      <SidebarOpt active Icon={HomeIcon} text="Feed" />
      <SidebarOpt Icon={SearchIcon} text="Explore" />
      <SidebarOpt
        Icon={PermIdentityIcon}
        text="Profile"
        onClick={() => {
          navigate("/profile/me");
        }}
      />
      <SidebarOpt
        Icon={LogoutIcon}
        text="Logout"
        onClick={() => handleLogout}
      />
      <Button variant="outlined" className="sidebar__tweet">
        Tweet
      </Button>
    </div>
  );
};

export default Sidebar;
