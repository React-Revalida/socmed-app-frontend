import React, { useContext, useEffect } from "react";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem/SidebarItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import LogoutDialog from "./LogoutDialog";
import { resetLoading } from "../../redux/actions/postActions";

import * as profileActions from "../../redux/actions/profileActions";
import PostEditForm from "../Feed/Post/PostEditForm";

const Sidebar = (otherLoc) => {
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

  const [open, setOpen] = React.useState(false);
  const handleOpenLogoutDialog = (isOpen) => {
    setOpen(isOpen);
  };

  const [openPostModal, setOpenPostModal] = React.useState(false);
  const handleAddPost = (isOpen) => {
    setOpenPostModal(isOpen);
  };

  return (
    <>
      <PostEditForm
        profile={profile}
        isPostModalOpen={openPostModal}
        onOpenPostModal={handleAddPost}
      />
      <LogoutDialog isDialogOpen={open} onOpenDialog={handleOpenLogoutDialog} />
      <div className="sidebar">
        <FlutterDashIcon className="twitter-icon" />
        <Button className="navButton">
          <Link
            to="/home"
            style={{ textDecoration: "none" }}
            onClick={() => [
              dispatch(resetLoading()),
              handleLocationChange("/home"),
            ]}
          >
            <SidebarItem
              text="Home"
              Icon={HomeIcon}
              active={
                otherLoc.otherLoc.otherLoc.length < 30 &&
                currLocation === "/home" &&
                true
              }
            />
          </Link>
        </Button>
        <Button className="navButton">
          <Link
            to="/messages"
            style={{ textDecoration: "none" }}
            onClick={() => [
              dispatch(resetLoading()),
              handleLocationChange("/messages"),
            ]}
          >
            <SidebarItem
              text="Chats"
              Icon={QuestionAnswerIcon}
              active={currLocation === "/messages" && true}
            />
          </Link>
        </Button>
        <Button className="navButton">
          <Link
            to="/profile"
            style={{ textDecoration: "none" }}
            onClick={() => [
              dispatch(resetLoading()),
              handleLocationChange("/profile"),
            ]}
          >
            <SidebarItem
              text="Profile"
              Icon={PersonIcon}
              active={
                otherLoc.otherLoc.otherLoc.length < 30 &&
                currLocation === "/profile" &&
                true
              }
            />
          </Link>
        </Button>

        <Button className="navButton" onClick={handleOpenLogoutDialog}>
          <SidebarItem text="Logout" Icon={LogoutIcon} />
        </Button>
        {otherLoc.otherLoc.otherLoc != "http://localhost:3000/home" ? (
          <div
            className="tweetButton"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleAddPost(true);
            }}
          >
            <PostAddIcon className="addPostIcon" />
            <span>Create Post</span>
          </div>
        ) : (
          <></>
        )}
        <div className="profileCard">
          <div className="profileCardImage">
            <Avatar
              round={true}
              size={40}
              src={profile.profilePic}
              name={profile.name}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/profile");
              }}
            />
          </div>
          <div className="profileCardNameCol">
            <div
              className="profileCardNameColName"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <span>&nbsp;{profile.firstname + " " + profile.lastname}</span>
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
