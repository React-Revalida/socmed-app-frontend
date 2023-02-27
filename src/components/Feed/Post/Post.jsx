import React, { useEffect } from "react";
import Avatar from "react-avatar";
import "./Post.css";
import FavoriteIcon from "../../icons/FavoriteIcon";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CommentIcon from "../../icons/CommentIcon";
import { MillToDate } from "../../../utils/MillToDate";
import ProfileCard from "../../ProfileCard/ProfileCard";
import * as likeActions from "../../../redux/actions/likeActions";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../../redux/actions/profileActions";
import * as postActions from "../../../redux/actions/postActions";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { CardActionArea } from "@mui/material";

const Post = ({ post, onLike }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  useEffect(() => {
    dispatch(likeActions.fetchLikesByPost(post.postId));
    dispatch(profileActions.fetchProfile());
    likedByYou();
  }, [dispatch]);

  const likePost = () => {
    onLike();
  };
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

  const [isVisibleProfileCard, setIsVisibleProfileCard] = React.useState(false);

  return (
    <div className="post" onMouseLeave={() => setIsVisibleProfileCard(false)}>
      <ProfileCard active={isVisibleProfileCard && true} />
      <div>
        <Avatar
          src={post.user.profilePic}
          name={post.user.firstname + " " + post.user.lastname}
          round={true}
          size={40}
          style={{ margin: 10 }}
        />
      </div>
      <div className="post-content-col">
        <CardActionArea
          onClick={() => [
            navigate(`/post/${post.postId}`),
            dispatch(postActions.resetLoading()),
          ]}
        >
          <div className="post-header">
            <span
              className="post-header-displayname"
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
          </div>
          <div className="post-content">
            {post.message} {liked ? liked : liked}
          </div>
          {post.imageUrl && (
            <div className="post-image">
              <img src={post.imageUrl} alt="shareimage" />
            </div>
          )}
        </CardActionArea>
        <div className="post-event">
          <div>
            {liked ? (
              <FavoriteOutlinedIcon
                className="postIcon"
                sx={{ color: teal[50] }}
              />
            ) : (
              <FavoriteIcon
                className="postIcon"
                onClick={() => {
                  likePost();
                }}
              />
            )}

            <span>{likes.length > 0 ? likes.length : ""}</span>
          </div>
          <div>
            <CommentIcon className="postIcon" />
            <span>{comments.length > 0 ? comments.length : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
