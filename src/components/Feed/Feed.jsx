import React, { useContext, useEffect } from "react";
import "./Feed.css";
import PostBox from "../../components/Feed/PostBox/PostBox";
import Post from "./Post/Post";
import HomeStars from "../icons/HomeStars";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import DrawerBar from "../DrawerBar/DrawerBar";
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
const Feed = () => {
  const { darkMode, onToggleDarkMode } = useContext(UserInterfaceContext);

  const selectPosts = useSelector((state) => state.post.posts);
  const [posts, setPosts] = useState(selectPosts);

  const selectLoading = useSelector((state) => state.post.loading);
  const [loading, setLoading] = useState(selectLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
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
        {isDrawerBar && (
          <div
            onClick={() => setIsDrawerBar(false)}
            className="drawerBarPanel"
          />
        )}
        <DrawerBar active={isDrawerBar} />
        <div className="feed-header">
          <div onClick={() => setIsDrawerBar(true)}>
            <Avatar />
          </div>
          <div className="feed-headerText">
            <span>Home</span>
          </div>
          <div className="homeStarsCol">
            <HomeStars className="homeStars" width={22} height={22} />
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
