import jwtDecode from "jwt-decode";
import http from "./http";

export const register = async (data) => {
  return await http.post("/users/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export function login(username, password) {
  return http.post("/auth", { username, password });
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getCurrentUser() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    return decoded;
  }
  return null;
}
