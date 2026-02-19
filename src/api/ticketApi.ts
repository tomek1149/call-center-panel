import type { PaginatedResponse, Ticket, TicketQuery, TicketStatus } from '@/types/ticket'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

export const ticketApi = {
  getAll: async (query: TicketQuery): Promise<PaginatedResponse<Ticket>> => {
    const params: Record<string, string | number> = {
      _page: query.page,
      _per_page: query.perPage,
    }
    if (query.status) {
      params.status = query.status
    }
    if (query.sortField) {
      params._sort = query.sortOrder === 'desc' ? `-${query.sortField}` : query.sortField
    }
    const { data } = await api.get<PaginatedResponse<Ticket>>('/tickets', { params })
    return data
  },

  getById: async (id: string): Promise<Ticket> => {
    const { data } = await api.get<Ticket>(`/tickets/${id}`)
    return data
  },

  updateStatus: async (id: string, status: TicketStatus): Promise<Ticket> => {
    const { data } = await api.patch<Ticket>(`/tickets/${id}`, { status })
    return data
  },

  deleteTicket: async (id: string): Promise<void> => {
    await api.delete(`/tickets/${id}`)
  },

  createTicket: async (ticket: Omit<Ticket, 'id'>): Promise<Ticket> => {
    const { data } = await api.post<Ticket>('/tickets', ticket)
    return data
  },
}
