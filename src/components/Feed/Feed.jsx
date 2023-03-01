import React, { useContext, useEffect } from "react";
import "./Feed.css";
import PostBox from "../../components/Feed/PostBox/PostBox";
import Post from "./Post/Post";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import Loading from "../Loading/Loading";
import { Avatar, CardActionArea } from "@mui/material";
import { UserInterfaceContext } from "../../contexts/UserInterfaceContext";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import Widgets from "../Widgets/Widgets";
import PostPage from "../../pages/Post/PostPage";
import { useState } from "react";

import * as likeActions from "../../redux/actions/likeActions";
import Sidebar from "../Sidebar/Sidebar";
const Feed = () => {
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

  const onLikePost = async (postId) => {
    console.log("like post" + postId);
    await dispatch(
      likeActions.likePost({
        liked: true,
        user: selectProfile.userId,
        post: postId,
      })
    );
  };

  const onUnlikePost = async (postId) => {
    console.log("unlike post" + postId);
    await dispatch(likeActions.unlikePost(postId, selectProfile.userId));
  };
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
            <AutoAwesomeIcon />
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
                onLike={onLikePost}
                onUnlike={onUnlikePost}
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
