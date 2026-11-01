export type TriageAction = 'auto_route' | 'human_review' | 'escalate';

export type TicketSeverity =
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'undetermined';

export interface PredictionRequest {
  text: string;
}

export interface Prediction {
  predicted_category: string;
  model_version: string;
  confidence: number | null;
  action: TriageAction;
  priority: 'normal' | 'high';
  requires_human_review: boolean;
  reason: string;
  severity: TicketSeverity;
  severity_reason: string;
  needs_more_information: boolean;
}

export interface PredictionResponse {
  data: Prediction;
}
