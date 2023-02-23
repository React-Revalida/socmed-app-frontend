import http from "./http";

export const getLikes = async (postId) => {
  return await http.get(`/likes/post/${postId}`);
};

export function likePost(liked, post, user) {
  return http.post("/likes/post", { liked, post, user });
}
