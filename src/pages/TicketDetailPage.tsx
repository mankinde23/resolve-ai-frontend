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

      <section className="space-y-2 rounded-lg border p-5">
        <h2 className="font-semibold">Original ticket</h2>
        <p className="whitespace-pre-wrap break-words">{ticket.text}</p>
      </section>

      <section className="space-y-3 rounded-lg border p-5">
        <h2 className="font-semibold">Prediction metadata</h2>
        <p>Category: {ticket.predictedCategory}</p>
        <p>Model version: {ticket.modelVersion}</p>
        <p>
          Confidence:{' '}
          {ticket.confidence == null
            ? 'Not provided'
            : `${(ticket.confidence * 100).toFixed(1)}%`}
        </p>
        <p className="break-all text-xs text-muted-foreground">
          Ticket ID: {ticket.id}
        </p>
      </section>
    </main>
  );
}
