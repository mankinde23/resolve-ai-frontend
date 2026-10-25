import {apiRequest} from '../lib/api';
import type {
  PredictionRequest,
  PredictionResponse,
} from '../types/prediction.types';

export const predictionsService = {
  classify: (payload: PredictionRequest) =>
    apiRequest<PredictionResponse>('/predictions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
