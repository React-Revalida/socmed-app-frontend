import { login } from "./auth";
import http from "./http";

// This is a workaround just to get the accessToken into localStorage
const staticLogin = (username, password) => {
  return login(username, password).then((response) => {
    localStorage.setItem("accessToken", response.data.accessToken);
  }).catch((error) => {
    console.log("staticLogin error: ", error);
  });
};

// This is the function that is called from the Profile component
export const getProfile = async () => {
  staticLogin("bryn", "admin2255");
  return await http.get("/users/me");
};

export const getOtherProfile = async (username) => {
  return await http.get(`/profiles/${username}`);
};