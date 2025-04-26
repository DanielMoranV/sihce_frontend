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
    user: null as User | null,
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
        console.log(error);
        this.setError(error.data.errors);
      }
      this.isLoading = false;
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
    },
    setUser(user: User | null) {
      this.user = user;
    },
    logout() {
      this.clearToken();
      this.user = null;
    },
  },
});
