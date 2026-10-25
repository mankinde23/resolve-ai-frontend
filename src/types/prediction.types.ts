export interface PredictionRequest {
  text: string;
}

export interface Prediction {
  predicted_category: string;
  model_version: string;
  confidence?: number | null;
}

export interface PredictionResponse {
  data: Prediction;
}
