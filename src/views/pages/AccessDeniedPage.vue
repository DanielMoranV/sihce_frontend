<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4"
  >
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
      <div class="flex justify-center mb-6">
        <LockIcon class="w-16 h-16 text-amber-500" />
      </div>

      <h1 class="text-3xl font-bold text-gray-800 mb-2">Acceso denegado</h1>
      <p class="text-gray-600 mb-4">
        No tienes los permisos necesarios para acceder a esta página.
      </p>
      <p class="text-sm text-gray-500 mb-6">
        Rol actual: <span class="font-medium">{{ userRole }}</span>
      </p>

      <div class="space-y-4">
        <Button variant="outline" class="w-full" @click="goBack">
          <ArrowLeftIcon class="w-4 h-4 mr-2" />
          Volver atrás
        </Button>

        <Button class="w-full" as-child>
          <RouterLink to="/dashboard">
            <LayoutGridIcon class="w-4 h-4 mr-2" />
            Ir al dashboard
          </RouterLink>
        </Button>

        <Button
          variant="ghost"
          class="w-full text-amber-600 hover:text-amber-700"
          as-child
        >
          <a href="mailto:soporte@tudominio.com">
            <MailIcon class="w-4 h-4 mr-2" />
            Solicitar acceso
          </a>
        </Button>
      </div>
    </div>

    <footer class="mt-8 text-sm text-gray-500">
      <p>Código de error: 403 - Forbidden</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  LockIcon,
  ArrowLeftIcon,
  LayoutGridIcon,
  MailIcon,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const router = useRouter();
const authStore = useAuthStore();

const userRole = computed(() => {
  return authStore.user?.role ? capitalize(authStore.user.role) : "Invitado";
});

const goBack = () => {
  router.go(-1);
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
</script>
