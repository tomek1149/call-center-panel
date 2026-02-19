<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTicketsStore } from '@/stores/useTicketsStore'
import TicketStatusBadge from '@/components/tickets/TicketStatusBadge.vue'
import TicketPriorityBadge from '@/components/tickets/TicketPriorityBadge.vue'
import Button from 'primevue/button'
import DataTable, { DataTableSortEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import type { Ticket } from '@/types/ticket'
import { formatDate } from '@/utlis/date'
import { LABELS } from '@/constants/labels'
import { PAGINATION } from '@/constants/ticket'

const router = useRouter()
const store = useTicketsStore()
const emit = defineEmits<{
  delete: [ticket: Ticket]
}>()

const onRowClick = (event: { data: Ticket }) => {
  router.push(`/ticket/${event.data.id}`)
}

const onPage = (event: { page: number; rows: number }) => {
  if (event.rows !== store.perPage) {
    store.setPerPage(event.rows)
  } else {
    store.setPage(event.page + 1)
  }
}

const onSort = (event: DataTableSortEvent) => {
  const field = typeof event.sortField === 'string' ? event.sortField : 'createdAt'
  const order = event.sortOrder === 1 ? 'asc' : 'desc'
  store.setSort(field, order)
}
</script>

<template>
  <DataTable
    :value="store.tickets"
    :loading="store.loading"
    row-hover
    striped-rows
    lazy
    paginator
    :rows="store.perPage"
    :total-records="store.totalRecords"
    :rows-per-page-options="[...PAGINATION.PER_PAGE_OPTIONS]"
    :first="(store.currentPage - 1) * store.perPage"
    :sort-field="store.sortField"
    @row-click="onRowClick"
    :sort-order="store.sortOrder === 'asc' ? 1 : -1"
    @sort="onSort"
    class="ticket-table"
    @page="onPage"
  >
    <template #empty>
      <p class="ticket-table__empty">
        {{ LABELS.tickets.empty }}
      </p>
    </template>

    <Column field="id" :header="LABELS.table.id">
      <template #body="{ data }: { data: Ticket }">
        <strong>#{{ data.id }}</strong>
      </template>
    </Column>

    <Column field="customerName" :header="LABELS.table.client">
      <template #body="{ data }: { data: Ticket }">
        {{ data.customerName }}
      </template>
    </Column>

    <Column field="subject" :header="LABELS.table.subject" />

    <Column field="status" sortable :header="LABELS.table.status">
      <template #body="{ data }: { data: Ticket }">
        <TicketStatusBadge :status="data.status" />
      </template>
    </Column>

    <Column field="priority" sortable :header="LABELS.table.priority">
      <template #body="{ data }: { data: Ticket }">
        <TicketPriorityBadge :priority="data.priority" />
      </template>
    </Column>

    <Column field="createdAt" sortable :header="LABELS.table.date">
      <template #body="{ data }: { data: Ticket }">
        {{ formatDate(data.createdAt) }}
      </template>
    </Column>

    <Column :header="LABELS.table.actions">
      <template #body="{ data }: { data: Ticket }">
        <Button severity="danger" text rounded @click.stop="emit('delete', data)">
          <i class="pi pi-trash" />
        </Button>
      </template>
    </Column>
  </DataTable>
</template>

<style lang="scss" scoped>
.ticket-table {
  @include card;

  :deep(.col-id) {
    width: 5rem;
  }

  :deep(.col-status),
  :deep(.col-priority) {
    width: 8.75rem;
  }

  :deep(.col-date) {
    width: 10rem;
    white-space: nowrap;
  }

  :deep(.col-actions) {
    width: 5rem;
  }
}
</style>
