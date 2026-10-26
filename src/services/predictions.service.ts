import {api} from '@/lib/api';
import type {
  PredictionRequest,
  PredictionResponse,
} from '@/types/prediction.types';

export const predictionsService = {
  classify: async (
    payload: PredictionRequest
  ): Promise<PredictionResponse> => {
    const response = await api.post<PredictionResponse>(
      '/predictions',
      payload
    );

    return response.data;
  },
};
