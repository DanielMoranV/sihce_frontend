<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
import NavMain from "@/components/NavMain.vue";
import NavUser from "@/components/NavUser.vue";
import CompanyLayout from "@/components/Company.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  ScanHeart,
  LayoutGrid,
  Users,
  Building2,
  Stethoscope,
  UserRoundPlus,
  FileText,
  Settings,
  Calendar,
} from "lucide-vue-next";
import { type NavGroup } from "@/types";
import { ref, computed } from "vue";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { capitalize } from "vue";
import router from "@/router";

const authStore = useAuthStore();

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

// Definición completa del menú con roles por item
const fullMenu: NavGroup[] = [
  {
    label: "Administración",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
        roles: ["developer", "admin", "doctor", "recepcionista"],
      },
      {
        title: "Usuarios",
        href: "/dashboard/users",
        icon: Users,
        roles: ["developer", "admin"],
      },
      {
        title: "Médicos",
        href: "/dashboard/doctors",
        icon: Stethoscope,
        roles: ["developer", "admin"],
      },
      {
        title: "Configuración",
        href: "/settings",
        icon: Settings,
        roles: ["admin"],
      },
    ],
  },
  {
    label: "Atención Médica",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
        roles: ["admin", "doctor"],
      },
      {
        title: "Pacientes",
        href: "/patients",
        icon: UserRoundPlus,
        roles: ["admin", "doctor", "recepcionista"],
      },
      {
        title: "Atenciones",
        href: "/appointments",
        icon: Calendar,
        roles: ["admin", "doctor", "recepcionista"],
      },
    ],
  },
  {
    label: "Gestión Clínica",
    items: [
      {
        title: "Almacenes",
        href: "/warehouses",
        icon: Building2,
        roles: ["admin"],
      },
      {
        title: "Reportes",
        href: "/reports",
        icon: FileText,
        roles: ["admin", "recepcionista"],
      },
    ],
  },
];

// Menú filtrado por rol del usuario
const mainNavGroups = computed(() => {
  const userRole = authStore.user?.role?.toLowerCase() || "guest";

  return fullMenu
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(userRole)),
    }))
    .filter((group) => group.items.length > 0); // Solo grupos con items visibles
});

const currentUser = ref({
  name: "",
  rol: "",
  avatar: "/avatars/shadcn.jpg",
});

onMounted(() => {
  if (!authStore.currentUser) {
    router.push("/login");
    return;
  }

  currentUser.value = {
    name: `${authStore.user?.first_name} ${authStore.user?.last_name}`,
    rol: capitalize(authStore.user?.role) || "Invitado",
    avatar: "/avatars/shadcn.jpg",
  };
});

const company = {
  name: "SHICE",
  logo: ScanHeart,
  plan: "Sistema Clínico",
};
</script>

<template>
  <Sidebar v-bind="props" variant="inset">
    <SidebarHeader>
      <CompanyLayout :company="company" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :groups="mainNavGroups" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="currentUser" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
