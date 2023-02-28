import http from "./http";

export const getComments = async (postId) => {
  return await http.get(`/comments/post/${postId}`);
};
// user is object
//           "user": {
//     "userId": 10002,
//     "username": "aynuson"
// }
// post is object
//      {
//  "message": "Great!!! This is a new comment",
//  "timestamp": "02/23/2023",
//       "post": 10001,
//       "user": {
//              "userId": 10002,
//              "username": "aynuson"
//          }
//   }
export function commentPost(comment) {
  return http.post("/comments", comment);
}
