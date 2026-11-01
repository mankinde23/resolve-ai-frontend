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
import {useCreateTicket} from '@/hooks/useCreateTicket';
import {getApiErrorMessage} from '@/lib/api';
import {
  predictionFormSchema,
  type PredictionFormValues,
} from '../prediction.schema';

export function PredictionForm() {
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

  const ticket = ticketMutation.data?.data;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Classify a support ticket</CardTitle>
        <p className="text-sm text-muted-foreground">
          Submit a customer issue for automated classification and triage.
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
              placeholder="Example: Payment processing is down. Customers cannot complete purchases..."
              rows={7}
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

          {ticketMutation.isError && (
            <p role="alert" className="text-sm text-destructive">
              {getApiErrorMessage(ticketMutation.error)}
            </p>
          )}

          {ticket && (
            <section
              className="space-y-4 rounded-lg border p-4"
              aria-live="polite"
            >
              <div>
                <p className="text-sm font-medium text-emerald-600">
                  Ticket successfully classified and saved
                </p>
                <h3 className="mt-1 text-xl font-bold">
                  {ticket.predictedCategory}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Severity</p>
                  <p className="font-semibold capitalize">
                    {ticket.severity}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Priority</p>
                  <p className="font-semibold capitalize">
                    {ticket.priority}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Action</p>
                  <p className="font-semibold capitalize">
                    {ticket.action.replace(/_/g, ' ')}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Confidence
                  </p>
                  <p className="font-semibold">
                    {ticket.confidence == null
                      ? 'Not provided'
                      : `${(ticket.confidence * 100).toFixed(1)}%`}
                  </p>
                </div>
              </div>

              <div className="rounded-md bg-muted p-3 space-y-2">
                <p className="text-sm font-medium">
                  {ticket.requiresHumanReview
                    ? 'Human review required'
                    : 'No human review flagged'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {ticket.reason}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Severity assessment</p>
                <p className="text-sm text-muted-foreground">
                  {ticket.severityReason}
                </p>
              </div>

              {ticket.needsMoreInformation && (
                <p className="text-sm text-amber-600">
                  Additional information is required for this ticket.
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                Model: {ticket.modelVersion}
              </p>
            </section>
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
