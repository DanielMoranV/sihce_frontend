import type { authPayload } from "@/types/auth";
import axios from "./axios";

// Auth API
export const login = (authPayload: authPayload) =>
  axios.post("/auth/login/", authPayload);
