<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type NavGroup } from "@/types";
import { useRoute, RouterLink } from "vue-router";
import { ChevronDown } from "lucide-vue-next";

defineProps<{
  groups: NavGroup[];
}>();

const route = useRoute();
</script>

<template>
  <div>
    <Collapsible
      v-for="group in groups"
      :key="group.label"
      defaultOpen
      class="group/collapsible"
    >
      <SidebarGroup class="px-2 py-0">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            {{ group.label }}
            <ChevronDown
              class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.items" :key="item.title">
              <SidebarMenuButton
                as-child
                :is-active="item.href === route.path"
                :tooltip="item.title"
              >
                <RouterLink :to="item.href">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  </div>
</template>
