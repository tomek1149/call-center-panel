export enum TicketStatus {
  New = 'new',
  InProgress = 'in_progress',
  Closed = 'closed',
}

export enum TicketPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export type FilterStatus = TicketStatus | 'all'

export interface Ticket {
  id: string
  customerName: string
  subject: string
  description: string
  priority: TicketPriority
  status: TicketStatus
  createdAt: string
}

export type CreateTicketPayload = Omit<Ticket, 'id'>

export interface TicketQuery {
  page: number
  perPage: number
  status?: TicketStatus
  sortField?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
}
