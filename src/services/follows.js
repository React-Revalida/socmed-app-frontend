import http from "./http";

export const getFollowers = async (username) => {
  return await http.get(`/followers/${username}`);
};

export const getFollowing = async (username) => {
  return await http.get(`/following/${username}`);
};

export const followUser = async (username) => {
  return await http.post(`/follow/${username}`);
};

export const unfollowUser = async (username) => {
  return await http.post(`/unfollow/${username}`);
};
