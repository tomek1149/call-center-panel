import { z } from 'zod'
import { TicketStatus, TicketPriority } from '@/types/ticket'
import { LABELS } from '@/constants/labels'

export const createTicketSchema = z.object({
  customerName: z
    .string()
    .min(1, LABELS.validation.customerNameRequired)
    .min(2, LABELS.validation.customerNameMin),
  subject: z
    .string()
    .min(1, LABELS.validation.subjectRequired)
    .min(3, LABELS.validation.subjectMin),
  description: z.string().min(1, LABELS.validation.descriptionRequired),
  priority: z.nativeEnum(TicketPriority),
  status: z.nativeEnum(TicketStatus),
})

export type CreateTicketForm = z.infer<typeof createTicketSchema>
