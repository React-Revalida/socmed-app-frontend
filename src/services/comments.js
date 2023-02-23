import http from "./http";

export const getComments = async (postId) => {
  return await http.get(`/comments/post/${postId}`);
};
// user is object
//           "user": {
//     "userId": 10002,
//     "username": "aynuson"
// }
export function likePost(message, timestamp, post, user) {
  return http.post("/comments", { message, timestamp, post, user });
}
