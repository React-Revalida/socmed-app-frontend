import * as type from "../types";
import * as chatService from "../../services/chat";

export const getMutualFollows = () => {
  return async (dispatch) => {
    dispatch(type.fetchMutualsRequest());
    await chatService
      .getMutualFollows()
      .then((response) => {
        const mutualFollows = response.data;
        dispatch(type.fetchMutualsSuccess(mutualFollows));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchMutualsFailure(errorMsg));
      });
  };
};
