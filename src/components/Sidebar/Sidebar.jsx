import React, { useContext, useEffect } from "react";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem/SidebarItem";
import ConstructionIcon from "@mui/icons-material/Construction";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import {
  BorderColor,
  DeleteForever,
  Edit,
  MoreHoriz,
} from "@mui/icons-material";

import {
  CardActionArea,
  FormControlLabel,
  FormGroup,
  Menu,
  MenuItem,
} from "@mui/material";
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
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import mainLogo from "./SpillLogo.png";
import * as profileActions from "../../redux/actions/profileActions";
import PostEditForm from "../Feed/Post/PostEditForm";
import { MaterialUISwitch } from "./MaterialUISwitch";
import Spill from "./Spill";

const Sidebar = ({ switchTheme, appTheme, otherLoc }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [location] = React.useState(useLocation().pathname);
  const profile = useSelector((state) => state.user.profile);
  // const [currLocation, setCurrentLocation] = React.useState(location);
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClick = () => {
    setOpenSnack(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}></Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    dispatch(profileActions.fetchProfile());
  }, [dispatch]);

  // const handleLocationChange = (location) => {
  //   setCurrentLocation(location);
  // };

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
        <img
          src={mainLogo}
          // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt="Spill"
          loading="lazy"
          className="twitter-icon"
        />
        {/* <Spill className="twitter-icon" /> */}
        <Button className="navButton">
          <Link
            to="/home"
            style={{ textDecoration: "none" }}
            onClick={() => [dispatch(resetLoading())]}
          >
            <SidebarItem
              text="Home"
              Icon={HomeIcon}
              active={
                otherLoc.otherLoc === "http://localhost:3000/home" && true
              }
            />
          </Link>
        </Button>

        {/* CONSTRUCTION */}
        {/* <Button className="navButton">
          <Link
            // to="/messages"
            style={{ textDecoration: "none" }}
            onClick={handleClick}
            // onClick={() => [dispatch(resetLoading())]}
          >
            <SidebarItem
              text="..."
              Icon={ConstructionIcon}
              // active={
              //   otherLoc.otherLoc === "http://localhost:3000/messages" && true
              // }
            />
          </Link>
        </Button> */}
        {/* CONSTRUCTION */}

        {/* CHAT */}
        <Button className="navButton">
          <Link
            to="/messages"
            style={{ textDecoration: "none" }}
            onClick={() => [dispatch(resetLoading())]}
          >
            <SidebarItem
              text="Chats"
              Icon={QuestionAnswerIcon}
              active={
                otherLoc.otherLoc === "http://localhost:3000/messages" && true
              }
            />
          </Link>
        </Button>
        {/* CHAT */}

        <Button className="navButton">
          <Link
            to="/profile"
            style={{ textDecoration: "none" }}
            onClick={() => [dispatch(resetLoading())]}
          >
            <SidebarItem
              text="Profile"
              Icon={PersonIcon}
              active={
                otherLoc.otherLoc === "http://localhost:3000/profile" && true
              }
            />
          </Link>
        </Button>

        <Button className="navButton" onClick={handleOpenLogoutDialog}>
          <SidebarItem text="Logout" Icon={LogoutIcon} />
        </Button>
        {otherLoc.otherLoc != "http://localhost:3000/home" ? (
          <div
            className="tweetButton"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleAddPost(true);
            }}
          >
            <PostAddIcon className="addPostIcon" />
            <span>Spill it</span>
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
              style={{ color: "var(--plain-text)" }}
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
            {/* <MoreHorizIcon /> */}
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <MoreHoriz
                    className="postMoreIcon"
                    variant="contained"
                    {...bindTrigger(popupState)}
                  />
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem>
                      {/* <IconButton
                        className="inline"
                        sx={{ ml: 1 }}
                        onClick={switchTheme}
                        color="inherit"
                      >
                        {appTheme === "dark" ? (
                          <Brightness7Icon />
                        ) : (
                          <Brightness4Icon />
                        )}
                      </IconButton> */}
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <MaterialUISwitch
                              defaultChecked
                              onChange={otherLoc.switchTheme}
                            />
                          }
                        />
                      </FormGroup>
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
          <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Under maintenance"
            action={action}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
