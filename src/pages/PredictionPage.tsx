import {Helmet} from 'react-helmet';

import {PredictionForm} from '@/features/predictions/components/PredictionForm';
import {TicketHistory} from '@/features/predictions/components/TicketHistory';

export default function PredictionPage() {
  return (
    <>
      <Helmet>
        <title>Resolve AI | Intelligent Ticket Triage</title>
        <meta
          name="description"
          content="Classify and prioritize IT support tickets with Resolve AI."
        />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:py-16">
          <header className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Resolve AI
            </p>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Intelligent support ticket classification and triage.
            </h1>

            <p className="max-w-2xl text-muted-foreground">
              Analyze support requests, identify their categories, assess
              severity and help support teams decide what needs attention.
            </p>
          </header>

          <section className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
            <PredictionForm />

            <aside className="space-y-5">
              <h2 className="text-lg font-semibold">
                How Resolve AI works
              </h2>

              {[
                {
                  number: '01',
                  title: 'Submit',
                  description: 'Enter the customer support issue.',
                },
                {
                  number: '02',
                  title: 'Classify and assess',
                  description:
                    'The ML service predicts the category and evaluates severity and triage requirements.',
                },
                {
                  number: '03',
                  title: 'Review and act',
                  description:
                    'Review the recommended action, confidence and whether human intervention is needed.',
                },
              ].map(step => (
                <div
                  key={step.number}
                  className="rounded-lg border p-4 space-y-2"
                >
                  <p className="text-xs font-semibold text-primary">
                    {step.number}
                  </p>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}

              <p className="text-xs text-muted-foreground">
                Model confidence is a prediction score, not a guarantee of
                correctness. Human review remains important for critical or
                uncertain cases.
              </p>
            </aside>
          </section>

          <section className="space-y-5">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold">Recent activity</h2>
              <p className="text-sm text-muted-foreground">
                Review previously classified support tickets.
              </p>
            </div>

            <TicketHistory />
          </section>

          <footer className="border-t pt-5 text-xs text-muted-foreground">
            Resolve AI — Machine learning powered support ticket triage.
          </footer>
        </div>
      </main>
    </>
  );
}
