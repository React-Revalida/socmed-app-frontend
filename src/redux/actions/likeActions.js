import * as likesService from "../../services/likes";
import * as type from "../types";
import { fetchPosts, fetchUserPosts } from "./postActions";

export const fetchLikesByPost = (postId) => {
  return async (dispatch) => {
    dispatch(type.fetchLikesRequest());
    likesService
      .getLikes(postId)
      .then((response) => {
        const likes = response.data;
        console.log(likes);
        dispatch(type.fetchLikesSuccess(likes));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchLikesFailure(errorMsg));
      });
  };
};

export const likePost = (likes, usern) => {
  const likesDetails = JSON.stringify(likes);
  console.log(likes);
  const likesDetailsBlob = new Blob([likesDetails], {
    type: "application/json",
  });

  let formData = new FormData();
  formData.append("like", likesDetailsBlob);
  return async (dispatch) => {
    dispatch(type.LikePostRequest());
    likesService
      .likePost(formData)
      .then(async (response) => {
        const likes = response.data;
        await dispatch(type.LikePostSuccess(likes));
        if (!usern) {
          await dispatch(fetchPosts());
        } else {
          await dispatch(fetchUserPosts(usern));
        }
      })
      .catch(async (error) => {
        await dispatch(type.LikePostFailure(error.response.data.fieldErrors));
      });
  };
};

export const unlikePost = (postId, userId, usern) => {
  return async (dispatch) => {
    dispatch(type.UnlikePostRequest());
    likesService
      .unlikePost(postId, userId)
      .then(async (response) => {
        const likes = response.data;
        console.log(likes);
        dispatch(type.UnlikePostSuccess(likes));
        if (!usern) {
          await dispatch(fetchPosts());
        } else {
          await dispatch(fetchUserPosts(usern));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.UnlikePostFailure(errorMsg));
      });
  };
};
