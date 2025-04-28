import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/auth/LoginPage.vue";
import LandingPage from "@/views/pages/LandingPage.vue";
import { useAuthStore } from "@/stores/auth";

type UserRole = "developer" | "doctor" | "recepcionista" | "guest";
interface RouteMeta {
  breadcrumb: string;
  roles?: UserRole[];
  requiresAuth?: boolean;
}

const routeConfigs = [
  {
    path: "/",
    name: "landing",
    component: LandingPage,
    meta: {
      breadcrumb: "Inicio",
      requiresAuth: false,
    } as RouteMeta,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      breadcrumb: "Iniciar sesión",
      requiresAuth: false,
    } as RouteMeta,
  },
  {
    path: "/access-denied",
    name: "access-denied",
    component: () => import("@/views/pages/AccessDeniedPage.vue"),
    meta: {
      breadcrumb: "Acceso denegado",
      requiresAuth: true,
    } as RouteMeta,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: {
      breadcrumb: "Panel de Control",
      roles: ["developer", "admin", "doctor", "recepcionista"],
      requiresAuth: true,
    } as RouteMeta,
    children: [
      {
        path: "",
        name: "dashboardHome",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          breadcrumb: "Home",
          roles: ["developer", "admin", "doctor", "recepcionista"],
        } as RouteMeta,
      },
      {
        path: "users",
        name: "users",
        component: () => import("@/views/users/Users.vue"),
        meta: {
          breadcrumb: "Usuarios",
          roles: ["admin", "developer"],
        } as RouteMeta,
      },
      // ... otras rutas hijas
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("@/views/pages/NotFoundPage.vue"),
    meta: {
      breadcrumb: "Página no encontrada",
      requiresAuth: false,
    } as RouteMeta,
  },
];

const routes = routeConfigs.map((route) => ({
  ...route,
  children: route.children?.map((child) => ({
    ...child,
    meta: { ...route.meta, ...child.meta },
  })),
}));

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;
  const allowedRoles = to.meta.roles as UserRole[] | undefined;
  const userRole = (authStore.user?.role?.toLowerCase() as UserRole) || "guest";

  // Redirigir a login si la ruta requiere autenticación y no está logueado
  if (requiresAuth && !authStore.isAuthenticated) {
    return next({
      name: "login",
      query: {
        redirect: to.fullPath,
        reason: "auth-required",
      },
    });
  }

  // Redirigir a dashboard si ya está autenticado y va a login/landing
  if (
    (to.name === "login" || to.name === "landing") &&
    authStore.isAuthenticated
  ) {
    return next({ name: "dashboardHome" });
  }

  // Verificar roles si la ruta los tiene definidos
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (authStore.isAuthenticated) {
      // Usuario autenticado pero sin permisos
      return next({ name: "access-denied" });
    } else {
      // Usuario no autenticado
      return next({
        name: "login",
        query: {
          redirect: to.fullPath,
          reason: "insufficient-permissions",
        },
      });
    }
  }

  next();
});

export default router;
