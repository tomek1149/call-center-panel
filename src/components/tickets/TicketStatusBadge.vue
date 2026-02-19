<script setup lang="ts">
import type { TicketStatus } from '@/types/ticket'
import { STATUS_LABELS } from '@/constants/ticket'

defineProps<{
  status: TicketStatus
}>()
</script>

<template>
  <span class="status-badge" :class="`badge--${status}`">
    {{ STATUS_LABELS[status] }}
  </span>
</template>

<style lang="scss" scoped>
.status-badge {
  width: max-content;
}
</style>
