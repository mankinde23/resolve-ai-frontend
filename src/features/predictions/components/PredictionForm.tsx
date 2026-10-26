import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
// import {usePrediction} from '@/hooks/usePrediction';
import {getApiErrorMessage} from '@/lib/api';
import {
  predictionFormSchema,
  type PredictionFormValues,
} from '../prediction.schema';
import { useCreateTicket } from '@/hooks/useCreateTicket';

export function PredictionForm() {
  // const prediction = usePrediction();
const ticketMutation = useCreateTicket();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionFormSchema),
    defaultValues: {text: ''},
  });

  const text = watch('text');
const onSubmit = (values: PredictionFormValues) => {
  ticketMutation.mutate({text: values.text});
};

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Classify a support ticket</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter a customer issue and let Resolve AI predict its category.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="ticket-text" className="text-sm font-medium">
              Ticket description
            </label>

            <Textarea
              id="ticket-text"
              placeholder="Example: I cannot reset my account password..."
              rows={6}
              maxLength={10_000}
              aria-invalid={Boolean(errors.text)}
              aria-describedby={
                errors.text ? 'ticket-error' : 'ticket-count'
              }
              {...register('text')}
            />

            {errors.text ? (
              <p
                id="ticket-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.text.message}
              </p>
            ) : (
              <p
                id="ticket-count"
                className="text-xs text-muted-foreground"
              >
                {text?.length ?? 0} / 10,000 characters
              </p>
            )}
          </div>

          {/* {prediction.isError && (
            <p role="alert" className="text-sm text-destructive">
              {getApiErrorMessage(prediction.error)}
            </p>
          )} */}

          {ticketMutation.isError && (
            <p role="alert" className="text-sm text-destructive">
              {getApiErrorMessage(ticketMutation.error)}
            </p>
          )}

          {ticketMutation.isSuccess && (
            <div
              className="space-y-2 rounded-lg border p-4"
              aria-live="polite"
            >
              <p className="text-sm text-muted-foreground">
                Ticket saved successfully
              </p>

              <p className="text-sm text-muted-foreground">
                Predicted category
              </p>
              <p className="text-2xl font-semibold">
                {ticketMutation.data.data.predictedCategory}
              </p>

              <p className="text-sm text-muted-foreground">
                Model: {ticketMutation.data.data.modelVersion}
              </p>

              <p className="text-sm text-muted-foreground">
                Confidence:{' '}
                {ticketMutation.data.data.confidence == null
                  ? 'Not provided'
                  : `${(ticketMutation.data.data.confidence * 100).toFixed(1)}%`}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={ticketMutation.isPending}>
              {ticketMutation.isPending
                ? 'Classifying and saving...'
                : 'Classify and save'}
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={ticketMutation.isPending}
              onClick={() => {
                reset();
                ticketMutation.reset();
              }}
            >
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
