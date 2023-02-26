import BackIcon from "@mui/icons-material/ArrowBackIosNew";
import { Card, Grid, IconButton, TableRow, Typography } from "@mui/material";
import { padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BottomSidebar from "../../components/BottomSidebar/BottomSidebar";
import Comment from "../../components/Comment/Comment";
import Post from "../../components/Feed/Post/Post";
import "./PostPage.css";
import Loading from "../../components/Loading/Loading";
import Widgets from "../../components/Widgets/Widgets";
import * as postActions from "../../redux/actions/postActions";

const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(postActions.fetchPostById(params.postId));
  }, [dispatch]);

  const loading = useSelector((state) => state.post.loading);
  const post = useSelector((state) => state.post.post);

  let dateFormat = new Date(post.timestamp).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <>
      <section className="feed">
        <div className="postHeader">
          <BackIcon
            onClick={() => [navigate("/"), postActions.resetLoading()]}
          />
          <span>Feeds</span>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Post key={post.postId} post={post} />
            <div className="postFooter">
              <Typography
                color={"#8899a6"}
                fontStyle="oblique"
                fontSize={12}
                padding={1}
              >
                {post.timestamp === null ? (
                  <div>
                    Test: 26{/*totalComments*/} comments · 130{/*totalLikes*/}{" "}
                    likes
                  </div>
                ) : (
                  <>
                    {dateFormat}
                    <br />
                    Test: 26{/*totalComments*/} comments · 130{/*totalLikes*/}{" "}
                    likes
                  </>
                )}
              </Typography>
            </div>
            <div className="postFooter">
              {/* {post.comment.map.(comment) => (<Comment comment={comment.message})/>)} */}
              <Comment />
            </div>
          </>
        )}

        <BottomSidebar />
      </section>
      <Widgets />
    </>
  );
};

export default PostPage;
