import { defineStore } from "pinia";
import type { User } from "@/types/auth";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
    isLoading: false,
    error: null as string | null,
    status: null as string | null,
  }),

  getters: {},
});
