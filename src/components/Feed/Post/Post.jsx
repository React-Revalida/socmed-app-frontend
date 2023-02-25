import React, { useEffect } from "react";
import Avatar from "react-avatar";
import "./Post.css";
import FavoriteIcon from "../../icons/FavoriteIcon";
import CommentIcon from "../../icons/CommentIcon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MillToDate } from "../../../utils/MillToDate";
import ProfileCard from "../../ProfileCard/ProfileCard";
import * as likeActions from "../../../redux/actions/likeActions";
import { useDispatch, useSelector } from "react-redux";

const Post = (post) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(likeActions.fetchLikesByPost(post.post.postId));
  }, [dispatch]);

  const loading = useSelector((state) => state.like.loading);
  const likes = useSelector((state) => state.like.likes);

  const [isVisibleProfileCard, setIsVisibleProfileCard] = React.useState(false);

  return (
    <div className="post" onMouseLeave={() => setIsVisibleProfileCard(false)}>
      <ProfileCard active={isVisibleProfileCard && true} />
      <div>
        <Avatar
          // src={post.post.imageUrl}
          round={true}
          size={40}
          style={{ margin: 10 }}
        />
      </div>
      <div className="post-content-col">
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
            {post.post.user.firstname + " " + post.post.user.lastname}
          </span>
          <span className="post-header-username">
            {"@" + post.post.user.username}
          </span>
          <span className="post-header-date">
            {MillToDate(post.post.timestamp)}
          </span>
          <MoreHorizIcon className="postMoreIcon" />
        </div>
        <div className="post-content">{post.post.message}</div>
        {post.post.imageUrl && (
          <div className="post-image">
            <img src={post.post.imageUrl} alt="shareimage" />
          </div>
        )}
        <div className="post-event">
          <div>
            <FavoriteIcon className="postIcon" />
            <span>{likes.length}</span>
          </div>
          <div>
            <CommentIcon className="postIcon" />
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
