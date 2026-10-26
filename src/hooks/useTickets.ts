import {ticketsService} from '@/services/ticket.service';
import {useQuery} from '@tanstack/react-query';

export function useTickets(limit = 10, offset = 0) {
  return useQuery({
    queryKey: ['tickets', 'list', {limit, offset}],
    queryFn: () => ticketsService.list(limit, offset),
  });
}

export function useTicket(id: string) {
  return useQuery({
    queryKey: ['tickets', 'detail', id],
    queryFn: () => ticketsService.getById(id),
    enabled: Boolean(id),
  });
}
