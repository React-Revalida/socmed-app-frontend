import { Avatar } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { forwardRef, useEffect } from "react";
import "../styles/Post.css";
import Actions from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import * as likeActions from "../redux/actions/likeActions";

const Post = (post) => {
  console.log(post.post);

  const dispatch = useDispatch();
  //dispatch(fetchProfile());

  useEffect(() => {
    dispatch(likeActions.fetchLikesByPost(post.post.postId));
  }, [dispatch]);

  const loading = useSelector((state) => state.like.loading);
  const likes = useSelector((state) => state.like.likes);
  const state = useSelector((state) => state);

  // console.log(state);
  // console.log(loading);
  // console.log(post.post);
  console.log(likes);
  return (
    <div className="post.post">
      <div className="post__avatar">
        <Avatar
        // src = {avatar}
        />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {/* Test */}
              {post.post.user.firstname + " " + post.post.user.lastname}
              <span className="post__headerSpecial">
                &ensp;
                {post.post.user.isValidated && (
                  <VerifiedUserIcon className="post__badge" />
                )}
                &ensp;@
                {post.post.user.username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            {/* <p>Test post.post desc</p> */}
            <p>{post.post.message}</p>
          </div>
        </div>
        <img src={post.post.imageUrl} alt="" />
        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          {likes.length}
          <FavoriteBorderIcon fontSize="small" />
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div>Post</div>
  //     <Actions />
  //   </>
  // );
};

export default Post;
