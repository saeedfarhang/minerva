import axios from "axios";

const baseURL = "/api/";
export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-type": "application/json",
    accept: "application/json",
  },
});
