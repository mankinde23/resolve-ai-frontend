import React from 'react';
import {Link} from 'react-router-dom';
import {useTickets} from '@/hooks/useTickets';

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function TicketHistory() {
  const limit = 10;
  const [offset, setOffset] = React.useState(0);
  const ticketsQuery = useTickets(limit, offset);

  if (ticketsQuery.isPending) {
    return (
      <p className="text-sm text-muted-foreground">Loading tickets...</p>
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
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Ticket history</h2>
          <p className="text-sm text-muted-foreground">
            {result.pagination.total} saved ticket(s)
          </p>
        </div>

        <button
          type="button"
          className="text-sm underline"
          disabled={ticketsQuery.isFetching}
          onClick={() => void ticketsQuery.refetch()}
        >
          Refresh
        </button>
      </div>

      {result.items.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="font-medium">No tickets yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Submit your first support ticket to see it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {result.items.map(ticket => (
            <article
              key={ticket.id}
              className="space-y-3 rounded-lg border p-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">
                    {ticket.predictedCategory}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(ticket.createdAt)}
                  </p>
                </div>

                <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize">
                  {ticket.severity} severity
                </span>
              </div>

              <p className="whitespace-pre-wrap break-words text-sm text-muted-foreground">
                {ticket.text}
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-md border px-2 py-1 capitalize">
                  {ticket.priority} priority
                </span>

                <span className="rounded-md border px-2 py-1">
                  {ticket.action.replace(/_/g, ' ')}
                </span>

                {ticket.requiresHumanReview && (
                  <span className="rounded-md border border-amber-500/50 px-2 py-1 text-amber-600">
                    Human review
                  </span>
                )}

                {ticket.needsMoreInformation && (
                  <span className="rounded-md border px-2 py-1">
                    More information needed
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                <p className="text-xs text-muted-foreground">
                  Model confidence:{' '}
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
