<script setup lang="ts" generic="TData">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { View, X } from 'lucide-vue-next'
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table: Table<TData>
}>()

const value = defineModel<string>('value')
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        v-model="value"
        placeholder="Buscar en todos los campos..."
        class="h-8 w-[150px] lg:w-[250px]"
      />
      <Button
        variant="outline"
        size="sm"
        class="h-8"
        @click="table.resetColumnFilters()"
      >
        <X class="mr-2 h-4 w-4" />
        Limpiar
      </Button>
    </div>
    <Button
      variant="outline"
      size="sm"
      class="h-8"
      @click="table.toggleAllColumnsVisible()"
    >
      <View class="mr-2 h-4 w-4" />
      Columnas
    </Button>
  </div>
</template>
