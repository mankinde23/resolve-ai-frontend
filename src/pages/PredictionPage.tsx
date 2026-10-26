import {Helmet} from 'react-helmet';

import {PredictionForm} from '@/features/predictions/components/PredictionForm';
import { TicketHistory } from '@/features/predictions/components/TicketHistory';

export default function PredictionPage() {
  return (
    <>
      <Helmet>
        <title>Resolve AI | Ticket Classifier</title>
        <meta
          name="description"
          content="Classify customer support tickets with Resolve AI."
        />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-20">
          <header className="mb-10 space-y-3">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Resolve AI
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Smarter support ticket triage.
            </h1>

            <p className="max-w-2xl text-muted-foreground">
              Use machine learning to identify the category of a customer
              support issue and accelerate the triage process.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
            <PredictionForm />

            <aside className="space-y-4">
              <h2 className="text-lg font-semibold">How it works</h2>

              <div className="rounded-lg border p-4 space-y-2">
                <p className="font-medium">01 — Submit</p>
                <p className="text-sm text-muted-foreground">
                  Enter the customer's support issue.
                </p>
              </div>

              <div className="rounded-lg border p-4 space-y-2">
                <p className="font-medium">02 — Predict</p>
                <p className="text-sm text-muted-foreground">
                  The backend sends the text to the trained ML model.
                </p>
              </div>

              <div className="rounded-lg border p-4 space-y-2">
                <p className="font-medium">03 — Review</p>
                <p className="text-sm text-muted-foreground">
                  Review the predicted category and model confidence.
                  Confidence is a model score, not a guarantee of
                  correctness.
                </p>
              </div>
            </aside>
            <div className="mt-12">
              <TicketHistory />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
