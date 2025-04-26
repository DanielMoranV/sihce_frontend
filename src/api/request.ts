// src/api/request.ts
import axiosInstance from "./axios";

function request(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any
) {
  // Asegurarte que siempre termine en "/"
  if (!url.endsWith("/")) {
    url += "/";
  }
  return axiosInstance({ method, url, data });
}

export default request;
