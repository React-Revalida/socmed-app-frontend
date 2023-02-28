import { login } from "./auth";
import http from "./http";

// This is a workaround just to get the accessToken into localStorage
const staticLogin = (username, password) => {
  return login(username, password)
    .then((response) => {
      localStorage.setItem("accessToken", response.data.accessToken);
    })
    .catch((error) => {
      console.log("staticLogin error: ", error);
    });
};

// This is the function that is called from the Profile component
export const getProfile = async () => {
  //staticLogin("bryn", "admin2255");
  return await http.get("/users/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export const getOtherProfile = async (username) => {
  return await http.get(`/profiles/${username}`);
};

export const updateProfile = async (data) => {
  return await http.put("/users/me/update-profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateAddress = async (data) => {
  return await http.put("/users/me/update-address", data);
};

export const getAllUsers = async () => {
  return await http.get("/users/all", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};
