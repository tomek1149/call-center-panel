<script setup lang="ts">
import { useTicketsStore } from '@/stores/useTicketsStore'
import TicketCard from '@/components/tickets/TicketCard.vue'
import Paginator from 'primevue/paginator'
import { PAGINATION } from '@/constants/ticket'
import { Ticket } from '@/types/ticket'

const store = useTicketsStore()
const emit = defineEmits<{
  delete: [ticket: Ticket]
}>()

const onPage = (event: { page: number; rows: number }) => {
  if (event.rows !== store.perPage) {
    store.setPerPage(event.rows)
  } else {
    store.setPage(event.page + 1)
  }
}
</script>

<template>
  <div class="mobile-list">
    <TicketCard
      v-for="ticket in store.tickets"
      :key="ticket.id"
      :ticket="ticket"
      @delete="(id) => emit('delete', store.tickets.find((t) => t.id === id)!)"
    />

    <Paginator
      :first="(store.currentPage - 1) * store.perPage"
      :rows="store.perPage"
      :total-records="store.totalRecords"
      :rows-per-page-options="[...PAGINATION.PER_PAGE_OPTIONS]"
      @page="onPage"
    />
  </div>
</template>

<style lang="scss" scoped>
.mobile-list {
  display: none;

  @include mobile {
    display: grid;
    gap: $spacing-md;
  }
}
</style>
