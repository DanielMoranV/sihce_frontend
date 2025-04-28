<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <BreadcrumbItem>
          <template v-if="item.href">
            <BreadcrumbLink
              :href="item.href"
              class="text-muted-foreground hover:text-primary transition-colors"
            >
              {{ item.name }}
            </BreadcrumbLink>
          </template>
          <template v-else>
            <BreadcrumbPage class="font-bold text-primary">{{
              item.name
            }}</BreadcrumbPage>
          </template>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < breadcrumbItems.length - 1">
          <ArrowRight class="mx-2 text-muted-foreground" />
        </BreadcrumbSeparator>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumb } from "@/composables/useBreadcrumb"; // Importamos el composable
const { breadcrumbItems } = useBreadcrumb(); // Obtenemos los items del breadcrumb
import { ArrowRight } from "lucide-vue-next";
</script>
