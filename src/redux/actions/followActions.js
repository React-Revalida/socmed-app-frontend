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

export const getLoggedInUserFollowing = (username) => {
  return async (dispatch) => {
    dispatch(type.fetchFollowsRequest());
    await followService
      .getFollowing(username)
      .then((response) => {
        const following = response.data;
        dispatch(type.fetchLoggedInUserFollowingSuccess(following));
      })
      .catch((error) => {
        dispatch(type.fetchLoggedInUserFollowingFailure(error));
      });
  };
};

export const followUser = (username) => {
  return async (dispatch) => {
    dispatch(type.followUserRequest());
    await followService
      .followUser(username)
      .then((response) => {
        const follows = response.data;
        dispatch(type.followUserSuccess(follows));
      })
      .catch((error) => {
        dispatch(type.followUserFailure(error));
      });
  };
};

export const unfollowUser = (username) => {
  return async (dispatch) => {
    dispatch(type.unfollowUserRequest());
    await followService
      .unfollowUser(username)
      .then((response) => {
        const follows = response.data;
        dispatch(type.unfollowUserSuccess(follows));
      })
      .catch((error) => {
        dispatch(type.unfollowUserFailure(error));
      });
  };
};
