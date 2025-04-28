<template>
  <SidebarProvider>
    <!-- Sidebar -->
    <AppSidebar />

    <SidebarInset>
      <!-- Header -->
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <!-- Sidebar Toggle Button -->
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />

          <!-- Breadcrumbs -->
          <Breadcrumb />
        </div>
      </header>

      <!-- Main Content Area -->
      <div
        class="flex flex-1 flex-col gap-4 p-4 pt-0 bg-background relative w-full md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2"
      >
        <router-view />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import AppSidebar from "@/components/AppSidebar.vue";

import Breadcrumb from "@/components/Breadcrumb.vue";
</script>

<style scoped>
/* Aquí puedes agregar estilos adicionales para tu layout */
</style>
