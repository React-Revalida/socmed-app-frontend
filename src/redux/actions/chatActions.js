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

export const getMessages = (senderName, receiverName) => {
  return async (dispatch) => {
    dispatch(type.fetchMessagesRequest());
    await chatService
      .getMessages(senderName, receiverName)
      .then((response) => {
        const messages = response;
        console.log(messages);
        dispatch(type.fetchMessagesSuccess(messages));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(type.fetchMessagesFailure(errorMsg));
      });
  };
};
