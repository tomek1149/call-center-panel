<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTicketsStore } from '@/stores/useTicketsStore'
import TicketTable from '@/components/tickets/TicketTable.vue'
import TicketMobileList from '@/components/tickets/TicketMobileList.vue'
import TicketCreateDialog from '@/components/tickets/TicketCreateDialog.vue'
import Button from 'primevue/button'
import TicketFilters from '@/components/tickets/TicketFilters.vue'
import { LABELS } from '@/constants/labels'
import { useConfirm } from 'primevue/useconfirm'
import { Ticket } from '@/types/ticket'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const confirm = useConfirm()
const store = useTicketsStore()

const createDialog = ref<InstanceType<typeof TicketCreateDialog>>()

onMounted(() => {
  store.fetchTickets()
})

const onDelete = (ticket: Ticket) => {
  confirm.require({
    message: LABELS.toast.deleteConfirm(ticket.id),
    header: LABELS.toast.confirmHeader,
    acceptLabel: LABELS.toast.confirmDelete,
    rejectLabel: LABELS.toast.confirmCancel,
    acceptClass: 'p-button-danger',
    accept: async () => {
      await store.deleteTicket(ticket.id)

      if (!store.errorData) {
        toast.add({
          severity: 'success',
          summary: LABELS.toast.success,
          detail: `Zgłoszenie #${ticket.id} zostało usunięte`,
          life: 3000,
        })
      } else {
        toast.add({
          severity: 'error',
          summary: LABELS.toast.error,
          detail: store.errorData,
          life: 5000,
        })
      }
    },
  })
}
</script>

<template>
  <div class="ticket-list">
    <div class="ticket-list__header">
      <h1 class="ticket-list__title">
        {{ LABELS.tickets.title }}
      </h1>
      <Button :label="LABELS.tickets.newTicket" icon="pi pi-plus" @click="createDialog?.open()" />
    </div>

    <TicketFilters class="ticket-list__filters" />

    <p v-if="store.errorData" aria-live="assertive" role="alert">
      {{ store.errorData }}
    </p>

    <template v-else>
      <div class="ticket-list__desktop">
        <TicketTable @delete="onDelete" />
      </div>
      <div class="ticket-list__mobile">
        <TicketMobileList @delete="onDelete" />
      </div>
    </template>

    <TicketCreateDialog ref="createDialog" />
  </div>
</template>

<style scoped lang="scss">
.ticket-list {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $topbar-height;
    margin-bottom: $spacing-lg;

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      height: auto;
      gap: $spacing-md;
      margin-bottom: $spacing-md;
    }
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: 700;
  }

  &__filters {
    margin-bottom: $spacing-lg;
  }

  &__desktop {
    @include mobile {
      display: none;
    }
  }

  &__mobile {
    display: none;

    @include mobile {
      display: block;
    }
  }
}
</style>
