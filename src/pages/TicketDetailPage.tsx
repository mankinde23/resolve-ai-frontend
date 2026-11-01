import {Link, useParams} from 'react-router-dom';
import {useTicket} from '@/hooks/useTickets';

export default function TicketDetailPage() {
  const {id = ''} = useParams();
  const ticketQuery = useTicket(id);

  if (ticketQuery.isPending) {
    return (
      <main className="mx-auto max-w-3xl p-6">Loading ticket...</main>
    );
  }

  if (ticketQuery.isError) {
    return (
      <main className="mx-auto max-w-3xl space-y-4 p-6">
        <p role="alert" className="text-destructive">
          Ticket not found or could not be loaded.
        </p>
        <Link to="/" className="underline">
          Back to Resolve AI
        </Link>
      </main>
    );
  }

  const ticket = ticketQuery.data.data;

  const statusClass = ticket.requiresHumanReview
    ? 'border-amber-500/40 bg-amber-500/10'
    : 'border-emerald-500/40 bg-emerald-500/10';

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <Link to="/" className="text-sm underline underline-offset-4">
        Back to Resolve AI
      </Link>

      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">Ticket details</p>
        <h1 className="text-3xl font-bold">{ticket.predictedCategory}</h1>
        <p className="text-sm text-muted-foreground">
          Created {new Date(ticket.createdAt).toLocaleString()}
        </p>
      </header>

      <section className="rounded-lg border p-5 space-y-2">
        <h2 className="font-semibold">Original ticket</h2>
        <p className="whitespace-pre-wrap break-words">{ticket.text}</p>
      </section>

      <section className="rounded-lg border p-5 space-y-4">
        <h2 className="font-semibold">AI triage assessment</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Severity</p>
            <p className="font-semibold capitalize">{ticket.severity}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Priority</p>
            <p className="font-semibold capitalize">{ticket.priority}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Recommended action
            </p>
            <p className="font-semibold">
              {ticket.action.replace(/_/g, ' ')}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Confidence</p>
            <p className="font-semibold">
              {ticket.confidence == null
                ? 'Not provided'
                : `${(ticket.confidence * 100).toFixed(1)}%`}
            </p>
          </div>
        </div>

        <div className={`rounded-lg border p-4 ${statusClass}`}>
          <p className="font-medium">
            {ticket.requiresHumanReview
              ? 'Human review required'
              : 'No human review flagged'}
          </p>
          <p className="mt-1 text-sm">{ticket.reason}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Severity reason</p>
          <p>{ticket.severityReason}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Additional information
          </p>
          <p>
            {ticket.needsMoreInformation
              ? 'More information is required.'
              : 'No additional information flagged.'}
          </p>
        </div>
      </section>

      <section className="rounded-lg border p-5 space-y-2">
        <h2 className="font-semibold">Prediction metadata</h2>
        <p>Model version: {ticket.modelVersion}</p>
        <p className="break-all text-xs text-muted-foreground">
          Ticket ID: {ticket.id}
        </p>
      </section>
    </main>
  );
}
