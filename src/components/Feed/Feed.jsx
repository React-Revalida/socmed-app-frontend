import React, { useContext, useEffect } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox/TweetBox";
import Post from "./Post/Post";
import HomeStars from "../icons/HomeStars";
import BottomSidebar from "../BottomSidebar/BottomSidebar";
import DrawerBar from "../DrawerBar/DrawerBar";
import Loading from "../Loading/Loading";
import { Avatar } from "@mui/material";
import { UserInterfaceContext } from "../../contexts/UserInterfaceContext";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../redux/actions/postActions";
import Widgets from "../Widgets/Widgets";

const Feed = () => {
  const { darkMode, onToggleDarkMode } = useContext(UserInterfaceContext);
  const posts = useSelector((state) => state.post.posts);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.fetchPosts());
  }, [dispatch]);

  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  const loading = useSelector((state) => state.post.loading);
  const profileImg = useSelector((state) => state.user.profile.profileImg);

  console.log(loading);

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
        <TweetBox />
        {loading ? (
          <Loading />
        ) : (
          <article>
            {posts.map((post) => (
              <Post key={post.postId} post={post} />
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
