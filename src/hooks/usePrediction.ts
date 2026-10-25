import { useMutation } from "@tanstack/react-query";
import { predictionsService } from "@/services/predictions.service";
import type { PredictionRequest } from "../types/prediction.types";

export function usePrediction() {
  return useMutation({
    mutationKey: ["predictions", "classify"],
    mutationFn: (payload: PredictionRequest) =>
      predictionsService.classify(payload),
  });
}
 