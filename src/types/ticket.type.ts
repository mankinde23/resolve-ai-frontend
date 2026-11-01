import type {TriageAction, TicketSeverity} from './prediction.types';

export interface Ticket {
  id: string;
  text: string;
  predictedCategory: string;
  modelVersion: string;
  confidence: number | null;
  action: TriageAction;
  priority: 'normal' | 'high';
  requiresHumanReview: boolean;
  reason: string;
  severity: TicketSeverity;
  severityReason: string;
  needsMoreInformation: boolean;
  createdAt: string;
}

export interface CreateTicketRequest {
  text: string;
}

export interface TicketListResponse {
  data: {
    items: Ticket[];
    pagination: {
      limit: number;
      offset: number;
      total: number;
      hasMore: boolean;
    };
  };
}

export interface TicketResponse {
  data: Ticket;
}
