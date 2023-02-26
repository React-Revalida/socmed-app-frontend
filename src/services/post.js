import http from "./http";

export const getPosts = async () => {
  return await http.get("/posts");
};

export const addPost = async (post) => {
  return await http.post("/posts", post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPostById = async (postId) => {
  return await http.get(`/post/${postId}`);
};

export const getUserPosts = async (username) => {
  return await http.get(`/profile/${username}/posts`);
};
