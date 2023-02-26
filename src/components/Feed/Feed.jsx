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
              <CardActionArea
                onClick={() => [
                  navigate(`/post/${post.postId}`),
                  dispatch(postActions.resetLoading()),
                ]}
              >
                <Post key={post.postId} post={post} />
              </CardActionArea>
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
