import { useReveal } from "@/hooks/useReveal";

export function OurStory() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div ref={ref} className="reveal grid gap-10 rounded-3xl border border-border bg-surface/50 p-8 md:p-14">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Cylix started in a kitchen that ran out of gas mid-iftar.
            </h2>
          </div>
          <div className="grid gap-6 text-muted-foreground md:grid-cols-2">
            <p>
              Every Pakistani household has a story like it, a wedding biryani half-cooked,
              a dhaba's lunch rush stalled, a mother holding a hot pan over a dead burner.
              The cylinder gives you no warning. You shake it, you guess, you hope.
            </p>
            <p>
              We thought a small box could fix that. Cylix is built by a team of engineers in
              Pakistan, for Pakistani kitchens and dhabas, designed to be honest, accurate,
              and quietly useful. No gimmicks, just a number you can plan around.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
           The Cylix team, Lahore
          </div>
        </div>
      </div>
    </section>
  );
}
