<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useTicketsStore } from '@/stores/useTicketsStore'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { TicketPriority, TicketStatus } from '@/types/ticket'
import { PRIORITY_OPTIONS } from '@/constants/ticket'
import { LABELS } from '@/constants/labels'
import { createTicketSchema } from '@/validation/ticket'
import Message from 'primevue/message'

const store = useTicketsStore()
const toast = useToast()
const visible = ref(false)

const initialForm = {
  customerName: '',
  subject: '',
  description: '',
  priority: TicketPriority.Medium,
  status: TicketStatus.New,
  createdAt: new Date().toISOString(),
}

const form = reactive({ ...initialForm })
const errors = reactive<Record<string, string>>({})

const clearErrors = () => {
  Object.keys(errors).forEach((key) => delete errors[key])
}

const validate = (): boolean => {
  clearErrors()
  const result = createTicketSchema.safeParse(form)

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      if (!errors[field]) errors[field] = issue.message
    }
    return false
  }
  return true
}

const open = () => {
  Object.assign(form, { ...initialForm })
  clearErrors()
  visible.value = true
}

const save = async () => {
  if (!validate()) return

  await store.createTicket({
    ...form,
    createdAt: new Date().toISOString(),
  })

  if (!store.errorData) {
    toast.add({
      severity: 'success',
      summary: LABELS.toast.success,
      detail: LABELS.toast.ticketCreated(form.subject),
      life: 3000,
    })
    visible.value = false
  } else {
    toast.add({
      severity: 'error',
      summary: LABELS.toast.error,
      detail: store.errorData,
      life: 5000,
    })
  }
}

defineExpose({ open })
</script>

<template>
  <Dialog v-model:visible="visible" :header="LABELS.tickets.newTicket" modal class="create-dialog">
    <form class="form" @submit.prevent="save">
      <div class="form__field">
        <label for="customerName">{{ LABELS.fields.client }}</label>
        <InputText
          id="customerName"
          v-model="form.customerName"
          :placeholder="LABELS.form.clientPlaceholder"
          :invalid="!!errors.customerName"
          fluid
        />
        <Message v-if="errors.customerName" severity="error" size="small" variant="simple">
          {{ errors.customerName }}
        </Message>
      </div>

      <div class="form__field">
        <label for="subject">{{ LABELS.fields.subject }}</label>
        <InputText
          id="subject"
          v-model="form.subject"
          :placeholder="LABELS.form.subjectPlaceholder"
          :invalid="!!errors.subject"
          fluid
        />
        <Message v-if="errors.subject" severity="error" size="small" variant="simple">
          {{ errors.subject }}
        </Message>
      </div>

      <div class="form__field">
        <label for="description">{{ LABELS.fields.description }}</label>
        <Textarea
          id="description"
          v-model="form.description"
          rows="4"
          :placeholder="LABELS.form.descriptionPlaceholder"
          :invalid="!!errors.description"
          fluid
        />
        <Message v-if="errors.description" severity="error" size="small" variant="simple">
          {{ errors.description }}
        </Message>
      </div>

      <div class="form__field">
        <label for="priority">{{ LABELS.fields.priority }}</label>
        <Select
          id="priority"
          v-model="form.priority"
          :options="PRIORITY_OPTIONS"
          option-label="label"
          option-value="value"
          fluid
        />
      </div>
    </form>

    <template #footer>
      <Button :label="LABELS.form.cancel" severity="secondary" text @click="visible = false" />
      <Button :label="LABELS.form.save" icon="pi pi-check" @click="save" />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  &__field {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-text-secondary;
  }
}
.create-dialog {
  min-width: 31.25rem;

  @media (max-width: 768px) {
    min-width: 90vw;
  }
}
</style>
