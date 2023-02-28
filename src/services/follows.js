import http from "./http";

export const getFollowers = async (username) => {
  return await http.get(`/followers/${username}`);
};

export const getFollowing = async (username) => {
  return await http.get(`/following/${username}`);
};

export const getLoggedInUserFollowing = async () => {
  return await http.get("/following", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export const getLoggedInUserFollowers = async () => {
  return await http.get("/followers", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export const followUser = async (username) => {
  return await http.post(`/follow/${username}`);
};

export const unfollowUser = async (username) => {
  return await http.post(`/unfollow/${username}`);
};

export const getWhoToFollow = async () => {
  return await http.get("/who-to-follow", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};
