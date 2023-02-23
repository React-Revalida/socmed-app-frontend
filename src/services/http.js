import axios from "axios";
import { unexpectedError } from "../redux/types";
import store from "../redux/store";
const http = axios.create({
  baseURL: "http://localhost:8080/api",
});

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    store.dispatch(unexpectedError(error));
    console.log("Logging the error", error);
  }

  return Promise.reject(error);
});

http.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    request.headers = { Authorization: `Bearer ${accessToken}` };
  }
  return request;
});

export default http;
