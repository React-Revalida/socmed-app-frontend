import http from "./http";

export function getPosts() {
  return http.get("/posts");
}
