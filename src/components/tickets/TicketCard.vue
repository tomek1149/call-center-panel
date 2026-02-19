<script lang="ts" setup>
import { useRouter } from 'vue-router'
import TicketStatusBadge from '@/components/tickets/TicketStatusBadge.vue'
import TicketPriorityBadge from '@/components/tickets/TicketPriorityBadge.vue'
import Button from 'primevue/button'
import type { Ticket } from '@/types/ticket'
import { formatDate } from '@/utlis/date'

const props = defineProps<{
  ticket: Ticket
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()

const router = useRouter()

const goToDetail = () => router.push(`/ticket/${props.ticket.id}`)
</script>

<template>
  <div class="ticket-card" @click="goToDetail">
    <div class="ticket-card__header">
      <span class="ticket-card__id">#{{ ticket.id }}</span>
      <div class="ticket-card__priority">
        <TicketPriorityBadge :priority="ticket.priority" />
      </div>
    </div>

    <h3 class="ticket-card__subject">
      {{ ticket.subject }}
    </h3>
    <p class="ticket-card__customer">
      {{ ticket.customerName }}
    </p>

    <div class="ticket-card__footer">
      <div class="ticket-card__badges">
        <TicketStatusBadge :status="ticket.status" />
      </div>
      <span class="ticket-card__date">{{ formatDate(ticket.createdAt) }}</span>
    </div>
    <Button
      class="ticket-card__delete"
      icon="pi pi-trash"
      rounded
      severity="danger"
      size="small"
      text
      @click.stop="emit('delete', ticket.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
.ticket-card {
  @include card;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  padding: $spacing-lg;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-lg;
    width: 100%;
    margin-bottom: $spacing-sm;
  }

  &__id {
    font-weight: 700;
    color: $color-text-secondary;
    font-size: $font-size-sm;
  }

  &__priority {
    margin-right: $spacing-sm;
  }

  &__subject {
    font-size: $font-size-base;
    font-weight: 600;
    margin-bottom: $spacing-xs;
  }

  &__customer {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: $spacing-md;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__date {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__delete {
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
  }
}
</style>
