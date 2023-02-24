import * as likesService from "../../services/likes";
import * as type from "../types";

export const fetchLikesByPost = (postId) => {
  return async (dispatch) => {
    dispatch(type.fetchLikesRequest());
    likesService
      .getLikes(postId)
      .then((response) => {
        const likes = response.data;
        dispatch(type.fetchLikesSuccess(likes));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchLikesFailure(errorMsg));
      });
  };
};
