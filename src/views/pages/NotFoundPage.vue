<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4"
  >
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
      <div class="flex justify-center mb-6">
        <AlertCircleIcon class="w-16 h-16 text-rose-500" />
      </div>

      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        Página no encontrada
      </h1>
      <p class="text-gray-600 mb-6">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>

      <div class="space-y-4">
        <Button variant="outline" class="w-full" @click="goBack">
          <ArrowLeftIcon class="w-4 h-4 mr-2" />
          Volver atrás
        </Button>

        <Button variant="ghost" as-child class="w-full">
          <RouterLink to="/">
            <HomeIcon class="w-4 h-4 mr-2" />
            Ir al inicio
          </RouterLink>
        </Button>
      </div>
    </div>

    <footer class="mt-8 text-sm text-gray-500">
      <p>Si crees que esto es un error, por favor contacta al soporte.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { AlertCircleIcon, ArrowLeftIcon, HomeIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
