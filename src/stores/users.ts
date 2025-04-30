import { defineStore } from "pinia";
import type { User } from "@/types/auth";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
    user: null as User | null,
    isLoading: false,
    error: null as string | null,
    status: null as string | null,
  }),

  getters: {},
});
