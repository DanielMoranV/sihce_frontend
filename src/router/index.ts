import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/pages/LandingPage.vue";
import Login from "@/views/auth/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
