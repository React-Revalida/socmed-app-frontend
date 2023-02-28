import * as commentService from "../../services/comments";
import * as type from "../types";
import { fetchPostById } from "./postActions";

export const fetchLikesByPost = (postId) => {
  return async (dispatch) => {
    dispatch(type.fetchCommentsRequest());
    commentService
      .getComments(postId)
      .then((response) => {
        const likes = response.data;
        console.log(likes);
        dispatch(type.fetchCommentsSuccess(likes));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchCommentsFailure(errorMsg));
      });
  };
};

export const commentPost = (comment, postId) => {
  const commentDetails = JSON.stringify(comment);
  console.log(comment);
  const commentDetailsBlob = new Blob([commentDetails], {
    type: "application/json",
  });

  let formData = new FormData();
  formData.append("comments", commentDetailsBlob);
  return async (dispatch) => {
    dispatch(type.CommentPostRequest());
    commentService
      .commentPost(formData)
      .then(async (response) => {
        const likes = response.data;
        await dispatch(type.CommentPostSuccess(likes));
        await dispatch(fetchPostById(postId));
      })
      .catch(async (error) => {
        await dispatch(
          type.CommentPostFailure(error.response.data.fieldErrors)
        );
      });
  };
};
