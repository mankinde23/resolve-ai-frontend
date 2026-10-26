import { ticketsService } from '@/services/ticket.service';
import { CreateTicketRequest } from '@/types/ticket.type';
import {useMutation, useQueryClient} from '@tanstack/react-query';


export function useCreateTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['tickets', 'create'],
    mutationFn: (payload: CreateTicketRequest) =>
      ticketsService.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tickets'],
      });
    },
  });
}
