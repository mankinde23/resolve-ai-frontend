import {z} from 'zod';

export const predictionFormSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Please enter a support ticket.')
    .max(10_000, 'Ticket text cannot exceed 10,000 characters.'),
});

export type PredictionFormValues = z.infer<typeof predictionFormSchema>;
