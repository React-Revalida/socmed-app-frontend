import http from "./http";

export const getFollowers = async (username) => {
  return await http.get(`/followers/${username}`);
};

export const getFollowing = async (username) => {
  return await http.get(`/following/${username}`);
};
