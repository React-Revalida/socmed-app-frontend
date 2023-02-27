import http from "./http";

export const getLikes = async (postId) => {
  return await http.get(`/likes/post/${postId}`);
};

export function likePost(data) {
  return http.post("/likes/post", data);
}

export function unlikePost(postId, userId) {
  return http.post(`/likes/unlike/${postId}/${userId}`);
}
