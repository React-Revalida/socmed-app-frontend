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
  const postMessageBlob = new Blob([postMessage], {
    type: "application/json",
  });
  const postImage = new File([image], "image", {
    type: "image/*",
  });
  let formData = new FormData();
  formData.append("post", postMessageBlob);
  formData.append("image", postImage);

  return (dispatch) => {
    dispatch(type.addPostRequest());
    postService
      .insertPost(formData)
      .then(async (response) => {
        const addedPost = response.data;
        await dispatch(type.addPostSuccess(addedPost));
      })
      .catch(async (error) => {
        const errorMsg = error.message;
        await dispatch(type.addPostFailure(errorMsg));
      });
  };
};

export const editPost = (postId, message, image) => {
  console.log(image);
  if (image === null) {
    image = "";
  }
  console.log(image);
  const postMessage = JSON.stringify(message);
  const postMessageBlob = new Blob([postMessage], {
    type: "application/json",
  });
  const postImage = new File([image], "image", {
    type: "image/*",
  });
  let formData = new FormData();
  formData.append("post", postMessageBlob);
  formData.append("image", postImage);

  return (dispatch) => {
    dispatch(type.editPostRequest());
    postService
      .updatePost(postId, formData)
      .then(async (response) => {
        const editedPost = response.data;
        await dispatch(type.editPostSuccess(editedPost));
      })
      .catch(async (error) => {
        const errorMsg = error.message;
        await dispatch(type.editPostFailure(errorMsg));
      });
  };
};

export const resetSuccess = () => {
  return (dispatch) => {
    dispatch(type.resetSuccessPost());
  };
};

export const fetchPostById = (postId) => {
  return async (dispatch) => {
    dispatch(type.fetchPostByIdRequest());
    postService
      .getPostById(postId)
      .then((response) => {
        console.log(response.data);
        const post = response.data;
        dispatch(type.fetchPostByIdSuccess(post));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchPostByIdFailure(errorMsg));
      });
  };
};

export const resetLoading = () => {
  return (dispatch) => {
    dispatch(type.resetLoading());
  };
};

export const fetchUserPosts = (username) => {
  return async (dispatch) => {
    dispatch(type.fetchUserPostsRequest());
    postService
      .getUserPosts(username)
      .then((response) => {
        const posts = response.data;
        dispatch(type.fetchUserPostsSuccess(posts));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchUserPostsFailure(errorMsg));
      });
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    dispatch(type.deletePostRequest());
    postService
      .removePost(postId)
      .then((response) => {
        const success = response.data;
        dispatch(type.deletePostSuccess(success));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.deletePostFailure(errorMsg));
      });
  };
};
