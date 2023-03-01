import http from "./http";

export const getPosts = async () => {
  return await http.get("/posts");
};

export const insertPost = async (post) => {
  return await http.post("/posts", post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPostById = async (postId) => {
  return await http.get(`/posts/${postId}`);
};

export const getUserPosts = async (username) => {
  return await http.get(`/profile/${username}/posts`);
};

export const removePost = async (postId) => {
  return await http.put(`/posts/delete/${postId}`);
};

export const updatePost = async (postId, post) => {
  return await http.put(`/posts/edit/${postId}`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
