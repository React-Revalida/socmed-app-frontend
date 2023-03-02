import React, { useContext, useEffect } from "react";
import "./Feed.css";
import PostBox from "../../components/Feed/PostBox/PostBox";
import Post from "./Post/Post";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import Loading from "../Loading/Loading";
import { IconButton } from "@mui/material";
import { UserInterfaceContext } from "../../contexts/UserInterfaceContext";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import Widgets from "../Widgets/Widgets";
import PostPage from "../../pages/Post/PostPage";
import { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";

import * as likeActions from "../../redux/actions/likeActions";
import Sidebar from "../Sidebar/Sidebar";
import Avatar from "react-avatar";
const Feed = ({ switchTheme }) => {
  const { darkMode, onToggleDarkMode } = useContext(UserInterfaceContext);

  const selectPosts = useSelector((state) => state.post.posts);
  const [posts, setPosts] = useState(selectPosts);

  const selectLoading = useSelector((state) => state.post.loading);
  const [loading, setLoading] = useState(selectLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.resetLoading());
    dispatch(postActions.fetchPosts());
  }, [dispatch]);

  const selectProfile = useSelector((state) => state.user.profile);
  const [profile, setProfile] = useState(selectProfile);
  useEffect(() => {
    setPosts(selectPosts);
    setLoading(selectLoading);
    setProfile(selectProfile);
    //params
  }, [selectPosts, selectLoading, selectProfile]);

  const theme = localStorage.getItem("darkMode");

  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  const profileImg = useSelector((state) => state.user.profile.profileImg);

  return (
    <>
      <section className="feed">
        <div className="feed-header">
          <div
            onClick={() => setIsDrawerBar(true)}
            className="feed-headerAvatar"
          >
            <Avatar
              name={profile.name}
              src={profile.profilePic}
              size={40}
              round={true}
            />
          </div>
          <div className="feed-headerText">
            <span>Home</span>
          </div>
          <div className="homeStarsCol">
            <IconButton
              className="inline"
              sx={{ ml: 1 }}
              onClick={switchTheme}
              color="inherit"
            >
              {theme === "light" ? <LightModeIcon /> : <NightlightIcon />}
            </IconButton>
          </div>
        </div>
        <PostBox />
        {loading ? (
          <Loading />
        ) : (
          <article>
            {posts.map((post) => (
              <Post
                key={post.postId}
                post={post}
                userLoggedIn={selectProfile}
              />
            ))}
          </article>
        )}
        <BottomSidebar />
      </section>

      <Widgets />
    </>
  );
};

export default Feed;
