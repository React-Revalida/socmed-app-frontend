import * as followService from "../../services/follows";
import * as type from "../types";

export const getUserFollowers = (username) => {
  return async (dispatch) => {
    dispatch(type.fetchFollowsRequest());
    await followService
      .getFollowers(username)
      .then((response) => {
        const followers = response.data;
        dispatch(type.fetchFollowersSuccess(followers));
      })
      .catch((error) => {
        dispatch(type.fetchFollowersFailure(error));
      });
  };
};

export const getUserFollowing = (username) => {
  return async (dispatch) => {
    dispatch(type.fetchFollowsRequest());
    await followService
      .getFollowing(username)
      .then((response) => {
        const following = response.data;
        dispatch(type.fetchFollowingSuccess(following));
      })
      .catch((error) => {
        dispatch(type.fetchFollowingFailure(error));
      });
  };
};
