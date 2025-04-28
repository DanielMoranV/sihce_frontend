<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
    TableRow,
  TableCaption
} from '@/components/ui/table'

import {
  FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import DataTablePagination from './DataTablePagination.vue';

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    caption?: string
}>()

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
     getPaginationRowModel: getPaginationRowModel(),
})
</script>

<template>
  <div class="border rounded-md">
    <Table>
          <TableCaption>{{ props.caption ?? 'Lista de registros' }}</TableCaption>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No se encontraron resultados.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
      <DataTablePagination :table="table" />
    </Table>
  </div>
</template>
