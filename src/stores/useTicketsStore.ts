import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ticketApi } from '@/api/ticketApi'
import type { Ticket, TicketStatus, FilterStatus, CreateTicketPayload } from '@/types/ticket'
import { DEFAULT_FILTER, PAGINATION } from '@/constants/ticket'
import { LABELS } from '@/constants/labels'

export const useTicketsStore = defineStore('tickets', () => {
  //state
  const tickets = ref<Ticket[]>([])
  const loading = ref(false)
  const errorData = ref<string | null>(null)
  const activeFilter = ref<FilterStatus>(DEFAULT_FILTER)
  const currentTicket = ref<Ticket | null>(null)

  //pagination
  const currentPage = ref<number>(PAGINATION.DEFAULT_PAGE)
  const perPage = ref<number>(PAGINATION.DEFAULT_PER_PAGE)
  const totalRecords = ref(0)
  const totalPages = ref(0)

  const sortField = ref<string>('createdAt')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  //actions
  const fetchTickets = async (): Promise<void> => {
    loading.value = true
    errorData.value = null
    try {
      const response = await ticketApi.getAll({
        page: currentPage.value,
        perPage: perPage.value,
        status: apiStatus(),
        sortField: sortField.value,
        sortOrder: sortOrder.value,
      })
      tickets.value = response.data
      totalRecords.value = response.items
      totalPages.value = response.pages
    } catch (error: unknown) {
      errorData.value = error instanceof Error ? error.message : LABELS.errors.fetchTicket
    } finally {
      loading.value = false
    }
  }

  const setSort = async (field: string, order: 'asc' | 'desc'): Promise<void> => {
    sortField.value = field
    sortOrder.value = order
    currentPage.value = PAGINATION.DEFAULT_PAGE
    await fetchTickets()
  }

  const setFilter = async (filter: FilterStatus): Promise<void> => {
    activeFilter.value = filter
    currentPage.value = PAGINATION.DEFAULT_PAGE
    await fetchTickets()
  }

  const setPage = async (page: number): Promise<void> => {
    currentPage.value = page
    await fetchTickets()
  }

  const setPerPage = async (rows: number): Promise<void> => {
    perPage.value = rows
    currentPage.value = PAGINATION.DEFAULT_PAGE
    await fetchTickets()
  }

  const updateTicketStatus = async (id: string, newStats: TicketStatus): Promise<void> => {
    try {
      const updated = await ticketApi.updateStatus(id, newStats)
      tickets.value = tickets.value.map((ticket) => (ticket.id === id ? updated : ticket))
    } catch (error: unknown) {
      errorData.value = error instanceof Error ? error.message : LABELS.errors.updateStatus
    }
  }

  const fetchTicketById = async (id: string): Promise<void> => {
    loading.value = true
    errorData.value = null
    try {
      currentTicket.value = await ticketApi.getById(id)
    } catch (error: unknown) {
      errorData.value = error instanceof Error ? error.message : 'Nie udało się pobrać zgłoszenia'
    } finally {
      loading.value = false
    }
  }

  const deleteTicket = async (id: string): Promise<void> => {
    try {
      await ticketApi.deleteTicket(id)
      await fetchTickets()
    } catch (error: unknown) {
      errorData.value = error instanceof Error ? error.message : LABELS.errors.deleteTicket
    }
  }

  const createTicket = async (payload: CreateTicketPayload): Promise<void> => {
    try {
      await ticketApi.createTicket(payload)
      await fetchTickets()
    } catch (error: unknown) {
      errorData.value = error instanceof Error ? error.message : LABELS.errors.createTicket
    }
  }

  //helpres

  const apiStatus = (): TicketStatus | undefined =>
    activeFilter.value === DEFAULT_FILTER ? undefined : (activeFilter.value as TicketStatus)

  return {
    tickets,
    currentTicket,
    loading,
    errorData,
    activeFilter,
    currentPage,
    perPage,
    totalRecords,
    totalPages,
    sortField,
    sortOrder,
    setSort,
    fetchTickets,
    fetchTicketById,
    setFilter,
    setPage,
    setPerPage,
    updateTicketStatus,
    deleteTicket,
    createTicket,
  }
})
