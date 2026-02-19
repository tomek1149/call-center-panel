<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketsStore } from '@/stores/useTicketsStore'
import { useToast } from 'primevue/usetoast'
import TicketStatusBadge from '@/components/tickets/TicketStatusBadge.vue'
import TicketPriorityBadge from '@/components/tickets/TicketPriorityBadge.vue'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Card from 'primevue/card'
import type { Ticket } from '@/types/ticket'
import { formatDate } from '@/utlis/date'
import { STATUS_OPTIONS } from '@/constants/ticket'
import { TicketStatus } from '@/types/ticket'
import { LABELS } from '@/constants/labels'
import Breadcrumb from 'primevue/breadcrumb'

const route = useRoute()
const router = useRouter()
const store = useTicketsStore()
const toast = useToast()

const ticketId = computed(() => route.params.id as string)
const ticket = computed<Ticket>(() => store.currentTicket! as Ticket)
const selectedStatus = ref<TicketStatus>(TicketStatus.New)

const isStatusChanged = computed<boolean>(() =>
  ticket.value ? selectedStatus.value !== ticket.value.status : false
)

onMounted(async () => {
  await store.fetchTicketById(ticketId.value)
  if (store.currentTicket) {
    selectedStatus.value = store.currentTicket.status
  }
})

const saveStatus = async () => {
  if (!store.currentTicket) return
  await store.updateTicketStatus(store.currentTicket.id, selectedStatus.value)
  await store.fetchTicketById(ticketId.value)

  if (!store.errorData) {
    toast.add({
      severity: 'success',
      summary: LABELS.toast.success,
      detail: LABELS.toast.statusUpdated,
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
}

const goBack = () => router.push('/')

const breadcrumbHome = {
  icon: 'pi pi-list',
  command: () => router.push('/'),
}

const breadcrumbItems = computed(() => [
  {
    label: LABELS.tickets.title,
    command: () => router.push('/'),
  },
  { label: ticket.value ? `#${ticket.value.id}` : '...' },
])
</script>

<template>
  <div v-if="store.loading" class="detail__loading">
    <i class="pi pi-spinner pi-spin" />
    {{ LABELS.tickets.loading }}
  </div>

  <div v-else-if="!store.currentTicket" class="detail__empty">
    <i class="pi pi-exclamation-circle" />
    <p>{{ LABELS.tickets.notFound }}</p>
    <Button :label="LABELS.tickets.backToList" icon="pi pi-arrow-left" @click="goBack" />
  </div>

  <div v-else class="detail">
    <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" class="detail__breadcrumb" />
    <div class="detail__header">
      <Button label="Powrót" icon="pi pi-arrow-left" severity="secondary" text @click="goBack" />
      <h1>{{ LABELS.detail.ticketTitle(ticket.id) }}</h1>
    </div>

    <div class="detail__grid">
      <Card class="detail__info">
        <template #title>
          {{ LABELS.detail.info }}
        </template>
        <template #content>
          <div class="detail__fields">
            <div class="detail__field">
              <span class="detail__label">{{ LABELS.fields.client }}</span>
              <span class="detail__value">{{ ticket.customerName }}</span>
            </div>
            <div class="detail__field">
              <span class="detail__label">{{ LABELS.fields.subject }}</span>
              <span class="detail__value">{{ ticket.subject }}</span>
            </div>
            <div class="detail__field">
              <span class="detail__label">{{ LABELS.fields.priority }}</span>
              <TicketPriorityBadge :priority="ticket.priority" />
            </div>
            <div class="detail__field">
              <span class="detail__label">{{ LABELS.fields.createdAt }}</span>
              <span class="detail__value">{{ formatDate(ticket.createdAt) }}</span>
            </div>
          </div>
        </template>
      </Card>

      <Card class="detail__description">
        <template #title>
          {{ LABELS.detail.description }}
        </template>
        <template #content>
          <p>{{ ticket.description }}</p>
        </template>
      </Card>

      <Card class="detail__status">
        <template #title>
          {{ LABELS.detail.status }}
        </template>
        <template #content>
          <div class="detail__status-current">
            <TicketStatusBadge :status="ticket.status" />
          </div>
          <div class="detail__status-form">
            <Select
              v-model="selectedStatus"
              :options="STATUS_OPTIONS"
              option-label="label"
              option-value="value"
              fluid
            />
            <Button
              :label="LABELS.detail.save"
              icon="pi pi-check"
              :disabled="!isStatusChanged"
              @click="saveStatus"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  &__header {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;

    h1 {
      font-size: $font-size-xl;
      font-weight: 700;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-lg;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &__info {
    grid-row: 1 / 2;
  }

  &__description {
    grid-row: 1 / 2;

    @include mobile {
      grid-row: auto;
    }
  }

  &__status {
    grid-column: 1 / -1;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__value {
    font-size: $font-size-base;
    color: $color-text;
  }

  &__status-current {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }

  &__status-form {
    display: flex;
    gap: $spacing-md;
    align-items: flex-start;

    @include mobile {
      flex-direction: column;
    }
  }

  &__loading {
    @include flex-center;
    gap: $spacing-sm;
    padding: $spacing-xl;
    color: $color-text-secondary;
    font-size: $font-size-lg;
  }

  &__empty {
    @include flex-center;
    flex-direction: column;
    gap: $spacing-md;
    padding: $spacing-xl;
    color: $color-text-secondary;

    i {
      font-size: 3rem;
    }
  }

  &__breadcrumb {
    margin-bottom: $spacing-lg;
    background: transparent;
    padding: 0;
  }
}
</style>
