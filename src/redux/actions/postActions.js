import * as postService from "../../services/post.js";
import * as type from "../types";

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(type.fetchPostsRequest());
    postService
      .getPosts()
      .then((response) => {
        console.log(response.data);
        const posts = response.data;
        dispatch(type.fetchPostsSuccess(posts));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchPostsFailure(errorMsg));
      });
  };
};

export const addPost = (message, image) => {
  if (image === null) {
    image = "";
  }
  const postMessage = JSON.stringify(message);
  console.log(postMessage);
  const postMessageBlob = new Blob([postMessage], {
    type: "application/json",
  });
  console.log(postMessageBlob);
  console.log(image);
  const postImage = new File([image], "image", {
    type: "image/*",
  });
  console.log(postImage);
  let formData = new FormData();
  formData.append("post", postMessageBlob);
  formData.append("image", postImage);
  console.log(formData);

  return (dispatch) => {
    dispatch(type.addPostRequest());
    postService
      .addPost(formData)
      .then(async (response) => {
        console.log(response);
        const addedPost = response.data;
        await dispatch(type.addPostSuccess(addedPost));
      })
      .catch(async (error) => {
        const errorMsg = error.message;
        await dispatch(type.addPostFailure(errorMsg));
      });
  };
};

export const resetSuccess = () => {
  return (dispatch) => {
    dispatch(type.resetSuccessPost());
  };
};
