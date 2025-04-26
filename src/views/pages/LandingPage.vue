<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center text-center px-4"
  >
    <img
      src="/dist/vite.svg"
      alt="Logo del sistema"
      class="w-24 mb-6 drop-shadow-md"
    />

    <h1 class="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
      Sistema de Historias Clínicas Electrónicas
    </h1>
    <p class="text-blue-700 max-w-xl mb-8 text-lg">
      Optimiza la gestión de pacientes, historias clínicas, unidades médicas y
      mucho más. Hecho para clínicas modernas y eficientes.
    </p>

    <RouterLink
      to="/login"
      class="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition"
    >
      Iniciar Sesión
    </RouterLink>

    <footer class="mt-16 text-blue-500 text-sm">
      &copy; 2025 SIHCE. Todos los derechos reservados.
    </footer>
  </div>
</template>

<script setup lang="ts">
// no es necesario nada por ahora
</script>

<style scoped></style>
