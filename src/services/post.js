import http from "./http";

export const getPosts = async () => {
  return await http.get("/posts");
};

export const addPost = async (data) => {
  return await http.post("/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
