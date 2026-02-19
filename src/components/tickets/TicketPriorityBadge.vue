<script setup lang="ts">
import type { TicketPriority } from '@/types/ticket'
import { PRIORITY_CONFIG } from '@/constants/ticket'

const props = defineProps<{
  priority: TicketPriority
}>()

const config = PRIORITY_CONFIG[props.priority]
</script>

<template>
  <span class="priority" :style="{ color: config.color }">
    <i :class="config.icon" />
    {{ config.label }}
  </span>
</template>

<style lang="scss" scoped>
.priority {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  font-weight: 600;
  font-size: $font-size-sm;

  i {
    font-size: $font-size-base;
  }
}
</style>
