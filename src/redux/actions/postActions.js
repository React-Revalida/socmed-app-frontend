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
