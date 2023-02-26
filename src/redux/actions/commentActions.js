import * as commentService from "../../services/comments";
import * as type from "../types";

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
