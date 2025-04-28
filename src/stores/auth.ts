import { defineStore } from "pinia";
import type {
  authPayload,
  LoginErrorResponse,
  LoginResponse,
  User,
} from "@/types/auth";
import type { TokenResponse } from "@/types/auth";
import { login } from "@/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    refresh: null as string | null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
    isLoading: false,
    error: null as LoginErrorResponse["errors"] | null,
    status: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isActive: (state) => state.user?.is_active,
    currentUser: (state) => state.user,
  },
  actions: {
    async login(authPayload: authPayload) {
      this.isLoading = true;
      try {
        const response = await login(authPayload);
        const responseAuth: LoginResponse = response.data;
        if (responseAuth.success) {
          this.setToken(responseAuth.data);
          this.setUser(responseAuth.data.user);
          this.setRefresh(responseAuth.data.refresh);
        }
      } catch (error: any) {
        this.setError(error.data.errors);
      } finally {
        this.isLoading = false;
      }
    },
    setToken(token: TokenResponse) {
      this.token = token.access;
      localStorage.setItem("token", token.access);
    },
    setRefresh(refresh: string) {
      this.refresh = refresh;
      localStorage.setItem("refresh", refresh);
    },
    setError(error: LoginErrorResponse["errors"]) {
      this.error = error;
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      this.user = null;
      this.refresh = null;
      this.error = null;
      this.status = null;
    },
    setUser(user: User | null) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout() {
      this.clearToken();
      this.user = null;
    },
  },
});
