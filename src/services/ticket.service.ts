import {api} from '@/lib/api';
import {
  CreateTicketRequest,
  TicketListResponse,
  TicketResponse,
} from '@/types/ticket.type';

export const ticketsService = {
  async create(payload: CreateTicketRequest) {
    const response = await api.post<TicketResponse>('/tickets', payload);
    return response.data;
  },

  async list(limit = 10, offset = 0) {
    const response = await api.get<TicketListResponse>('/tickets', {
      params: {limit, offset},
    });
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<TicketResponse>(`/tickets/${id}`);
    return response.data;
  },
};
