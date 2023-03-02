import React, { useContext, useEffect, useState } from "react";
import Avatar from "react-avatar";
import "./Post.css";
import PostEditForm from "./PostEditForm";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { MillToDate } from "../../../utils/MillToDate";
import ProfileCard from "../../ProfileCard/ProfileCard";
import * as likeActions from "../../../redux/actions/likeActions";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../../redux/actions/postActions";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { CardActionArea, Menu, MenuItem, MenuList } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

import {
  BorderColor,
  DeleteForever,
  Edit,
  MoreHoriz,
} from "@mui/icons-material";
import { UserInterfaceContext } from "../../../contexts/UserInterfaceContext";
import { useStyles } from "../Layout/Style";

const Post = ({ post, onLike, onUnlike, from, onDelete }) => {
  const fromComponent = from || " ";
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [open, setOpen] = React.useState(false);
  const { onPostPage } = useContext(UserInterfaceContext);

  const isDarkMode = localStorage.getItem("darkMode");

  useEffect(() => {
    // dispatch(likeActions.fetchLikesByPost(post.postId));
    // dispatch(profileActions.fetchProfile());
    likedByYou();
  }, [dispatch]);

  const loading = useSelector((state) => state.like.loading);
  const likes = post.likes;
  const comments = post.comments;
  let [liked, setLiked] = React.useState(false);

  const navigate = useNavigate();

  const likedByYou = () => {
    likes.map((user) => {
      if (profile.userId == user.userId) {
        setLiked(true);
      }
    });
  };

  const deletePost = (e, postId) => {
    onDelete(postId);
    e.preventDefault();
  };

  const editPost = (isOpen) => {
    setOpen(isOpen);
  };

  const [isVisibleProfileCard, setIsVisibleProfileCard] = React.useState(false);

  return (
    <>
      <PostEditForm
        profile={profile}
        post={post}
        isPostModalOpen={open}
        onOpenPostModal={editPost}
      />
      <div className="post" onMouseLeave={() => setIsVisibleProfileCard(false)}>
        <ProfileCard
          active={isVisibleProfileCard && true}
          profile={post.user}
        />
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/profile/${post.user.username}`)}
        >
          <Avatar
            src={post.user.profilePic}
            name={post.user.firstname + " " + post.user.lastname}
            round={true}
            size={40}
            style={{ margin: 10 }}
          />
        </div>
        <div className="post-content-col">
          <div className="post-header">
            <span
              className="post-header-displayname"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/profile/${post.user.username}`)}
              onMouseEnter={() => setIsVisibleProfileCard(true)}
              onMouseLeave={() => {
                setTimeout(function () {
                  setIsVisibleProfileCard(false);
                }, 1000);
              }}
            >
              {post.user.firstname + " " + post.user.lastname}
            </span>
            <span className="post-header-username">
              {"@" + post.user.username}
            </span>
            <span className="post-header-date">
              {MillToDate(post.timestamp)}
            </span>
            {fromComponent == "profile" ? (
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <MoreHoriz
                      className="postMoreIcon"
                      variant="contained"
                      {...bindTrigger(popupState)}
                    />
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        sx={{
                          fontFamily: "Poppins",
                          color: "var(--twitter-color)",
                          "&:hover": {
                            backgroundColor: "var(--hover-blue-color)",
                          },
                        }}
                        onClick={(e) => {
                          deletePost(e, post.postId);
                          popupState.close();
                        }}
                      >
                        <DeleteForever sx={{ color: "var(--twitter-color)" }} />
                        &ensp; Delete
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontFamily: "Poppins",
                          color: "var(--twitter-color)",
                          "&:hover": {
                            backgroundColor: "var(--hover-blue-color)",
                          },
                        }}
                        onClick={() => {
                          editPost(true);
                          popupState.close();
                        }}
                      >
                        <BorderColor sx={{ color: "var(--twitter-color)" }} />{" "}
                        &ensp; Edit
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            ) : (
              <div></div>
            )}
          </div>
          {onPostPage ? (
            <>
              <div className="post-content">{post.message}</div>
              {post.imageUrl && (
                <div className="post-image">
                  <img src={post.imageUrl} alt="shareimage" />
                </div>
              )}
            </>
          ) : (
            <CardActionArea
              onClick={() => [
                navigate(`/posts/${post.postId}`),
                dispatch(postActions.resetLoading()),
              ]}
            >
              <div className="post-content">{post.message}</div>
              {post.imageUrl && (
                <div className="post-image">
                  <img src={post.imageUrl} alt="shareimage" />
                </div>
              )}
            </CardActionArea>
          )}

          <div className="post-event">
            <div>
              {liked ? (
                <LocalCafeIcon
                  className="postIcon"
                  onClick={async (e) => {
                    // unlikePost(e, post.postId);
                    if (fromComponent === "profile") {
                      await dispatch(
                        likeActions.unlikePost(
                          post.postId,
                          profile.userId,
                          profile.username,
                          fromComponent
                        )
                      );
                    } else if (fromComponent === "postpage") {
                      await dispatch(
                        likeActions.unlikePost(
                          post.postId,
                          profile.userId,
                          post.postId,
                          fromComponent
                        )
                      );
                    } else {
                      await dispatch(
                        likeActions.unlikePost(post.postId, profile.userId)
                      );
                    }
                  }}
                />
              ) : (
                <LocalCafeOutlinedIcon
                  className="postIcon"
                  onClick={async (e) => {
                    // likePost(e, post.postId);
                    if (fromComponent === "profile") {
                      await dispatch(
                        likeActions.likePost(
                          {
                            liked: true,
                            user: profile.userId,
                            post: post.postId,
                          },
                          profile.username,
                          fromComponent
                        )
                      );
                    } else if (fromComponent === "postpage") {
                      await dispatch(
                        likeActions.likePost(
                          {
                            liked: true,
                            user: profile.userId,
                            post: post.postId,
                          },
                          post.postId,
                          fromComponent
                        )
                      );
                    } else {
                      await dispatch(
                        likeActions.likePost({
                          liked: true,
                          user: profile.userId,
                          post: post.postId,
                        })
                      );
                    }
                  }}
                />
              )}
              <span>{likes.length > 0 ? likes.length : ""}</span>
            </div>
            <div>
              <ChatBubbleOutlineIcon
                onClick={() => [
                  navigate(`/posts/${post.postId}`),
                  dispatch(postActions.resetLoading()),
                ]}
                className="postIcon"
              />
              <span>{comments.length > 0 ? comments.length : ""}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
