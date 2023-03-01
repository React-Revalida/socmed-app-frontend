import React, { useContext, useEffect } from "react";
import "./Feed.css";
import PostBox from "../../components/Feed/PostBox/PostBox";
import Post from "./Post/Post";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import Loading from "../Loading/Loading";
import { Avatar, CardActionArea, IconButton } from "@mui/material";
import { UserInterfaceContext } from "../../contexts/UserInterfaceContext";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import Widgets from "../Widgets/Widgets";
import PostPage from "../../pages/Post/PostPage";
import { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import * as likeActions from "../../redux/actions/likeActions";
import Sidebar from "../Sidebar/Sidebar";
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
    console.log("reset loading in post");
    dispatch(postActions.fetchPosts());
  }, [dispatch]);

  const selectProfile = useSelector((state) => state.user.profile);
  useEffect(() => {
    setPosts(selectPosts);
    setLoading(selectLoading);
    //params
  }, [selectPosts, selectLoading]);

  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  const profileImg = useSelector((state) => state.user.profile.profileImg);

  return (
    <>
      <section className="feed">
        <div className="feed-header">
          <div onClick={() => setIsDrawerBar(true)}>
            <Avatar />
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
              <AutoAwesomeIcon />
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
