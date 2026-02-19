import { TicketStatus, TicketPriority, FilterStatus } from '@/types/ticket'

export const STATUS_LABELS: Record<TicketStatus, string> = {
  [TicketStatus.New]: 'Nowe',
  [TicketStatus.InProgress]: 'W trakcie',
  [TicketStatus.Closed]: 'Zamknięte',
}

export const STATUS_OPTIONS = Object.values(TicketStatus).map((value) => ({
  label: STATUS_LABELS[value],
  value,
}))

export const FILTER_OPTIONS = [{ label: 'Wszystkie', value: 'all' as const }, ...STATUS_OPTIONS]

export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  [TicketPriority.Low]: 'Niski',
  [TicketPriority.Medium]: 'Średni',
  [TicketPriority.High]: 'Wysoki',
}

export const PRIORITY_OPTIONS = Object.values(TicketPriority).map((value) => ({
  label: PRIORITY_LABELS[value],
  value,
}))

export const PRIORITY_CONFIG: Record<
  TicketPriority,
  { label: string; icon: string; color: string }
> = {
  [TicketPriority.High]: { label: 'Wysoki', icon: 'pi pi-angle-double-up', color: '#EF4444' },
  [TicketPriority.Medium]: { label: 'Średni', icon: 'pi pi-minus', color: '#F59E0B' },
  [TicketPriority.Low]: { label: 'Niski', icon: 'pi pi-angle-double-down', color: '#6B7280' },
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 5,
  PER_PAGE_OPTIONS: [5, 10, 20],
  MOBILE_PER_PAGE_OPTIONS: [5, 10],
} as const

export const DEFAULT_FILTER: FilterStatus = 'all'
