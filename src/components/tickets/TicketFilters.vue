<script setup lang="ts">
import { useTicketsStore } from '@/stores/useTicketsStore'
import SelectButton from 'primevue/selectbutton'
import type { FilterStatus } from '@/types/ticket'
import { FILTER_OPTIONS } from '@/constants/ticket'

const store = useTicketsStore()

const onChange = (event: { value: FilterStatus }) => {
  if (event.value) store.setFilter(event.value)
}
</script>

<template>
  <SelectButton
    :model-value="store.activeFilter"
    :options="FILTER_OPTIONS"
    option-label="label"
    option-value="value"
    @change="onChange"
  />
</template>
