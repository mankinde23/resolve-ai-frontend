import {Link} from 'react-router-dom';
import {useTickets} from '@/hooks/useTickets';
import React from 'react';

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function TicketHistory() {
  const limit = 10;
  const [offset, setOffset] = React.useState(0);
  const ticketsQuery = useTickets(limit, offset);

  if (ticketsQuery.isPending) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading ticket history...
      </p>
    );
  }

  if (ticketsQuery.isError) {
    return (
      <div className="space-y-3">
        <p role="alert" className="text-sm text-destructive">
          Could not load ticket history.
        </p>
        <button
          type="button"
          className="text-sm underline"
          onClick={() => void ticketsQuery.refetch()}
        >
          Try again
        </button>
      </div>
    );
  }

  const result = ticketsQuery.data.data;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Recent tickets</h2>
        <p className="text-sm text-muted-foreground">
          {result.pagination.total} saved ticket(s)
        </p>
      </div>

      {result.items.length === 0 ? (
        <p className="rounded-lg border p-6 text-sm text-muted-foreground">
          No tickets yet. Classify and save your first support ticket
          above.
        </p>
      ) : (
        <div className="space-y-3">
          {result.items.map(ticket => (
            <article
              key={ticket.id}
              className="space-y-2 rounded-lg border p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-medium">{ticket.predictedCategory}</h3>
                <time className="text-xs text-muted-foreground">
                  {formatDate(ticket.createdAt)}
                </time>
              </div>

              <p className="whitespace-pre-wrap break-words text-sm">
                {ticket.text}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">
                  Model: {ticket.modelVersion}
                  {' · '}
                  Confidence:{' '}
                  {ticket.confidence == null
                    ? 'N/A'
                    : `${(ticket.confidence * 100).toFixed(1)}%`}
                </p>

                <Link
                  to={`/tickets/${ticket.id}`}
                  className="text-sm font-medium underline underline-offset-4"
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
          disabled={offset === 0 || ticketsQuery.isFetching}
          onClick={() => setOffset(Math.max(0, offset - limit))}
        >
          Previous
        </button>

        <span className="text-xs text-muted-foreground">
          {result.pagination.total === 0
            ? 'Page 0'
            : `Page ${Math.floor(offset / limit) + 1} of ${Math.ceil(result.pagination.total / limit)}`}
        </span>

        <button
          type="button"
          className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
          disabled={!result.pagination.hasMore || ticketsQuery.isFetching}
          onClick={() => setOffset(offset + limit)}
        >
          Next
        </button>
      </div>
    </section>
  );
}
