import BackIcon from "@mui/icons-material/ArrowBackIosNew";
import { Card, Grid, IconButton, TableRow, Typography } from "@mui/material";
import { padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Comment from "../../components/Comment/Comment";
import Post from "../../components/Feed/Post/Post";
import "./PostPage.css";
import Loading from "../../components/Loading/Loading";
import Widgets from "../../components/Widgets/Widgets";
import * as postActions from "../../redux/actions/postActions";
import CommentBox from "./CommentBox/CommentBox";
import Sidebar from "../../components/Sidebar/Sidebar";

const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const loading = useSelector((state) => state.post.loading);
  const post = useSelector((state) => state.post.post);
  useEffect(() => {
    dispatch(postActions.fetchPostById(params.postId));
    console.log(post);
  }, [dispatch]);

  let dateFormat = new Date(post.timestamp).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <>
      <section className="feed">
        <div className="postHeader">
          <BackIcon
            onClick={() => [navigate("/home"), postActions.resetLoading()]}
          />
          <span>Feeds</span>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Post key={post.postId} post={post} from={"postpage"} />
            <div className="postFooter">
              <Typography
                color={"#8899a6"}
                fontStyle="oblique"
                fontSize={12}
                padding={1}
              >
                {post.timestamp === null ? (
                  <div>No timestamp available</div>
                ) : (
                  <>
                    {dateFormat}
                    <br />
                  </>
                )}
              </Typography>
            </div>
            <div className="postFooter">
              <CommentBox postUser={post.user} pid={post.postId} />
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </>
        )}
      </section>
      <Widgets />
    </>
  );
};

export default PostPage;
