import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReveal } from "@/hooks/useReveal";

const FAQS = [
  {
    q: "What exactly does Cylix measure?",
    a: "Cylix uses a precision load-cell to continuously weigh your cylinder. Because remaining gas is just a question of weight, the reading is gram-accurate, not an estimate from pressure or temperature.",
  },
  {
    q: "Does it work with my existing cylinder?",
    a: "Yes. Cylix is designed for the standard 11.8kg and 15kg LPG cylinders that Pakistani homes and dhabas already use. No special tank, no plumbing changes.",
  },
  {
    q: "Do I need internet or WiFi?",
    a: "Cylix connects over your home WiFi to send live readings and alerts to the Cylix app. As long as your phone has internet, you'll see the latest level wherever you are.",
  },
  {
    q: "How accurate is the gas-level reading?",
    a: "Within ±1% in normal conditions. We tare automatically for the empty cylinder weight when you set up so the percentage shown is true remaining gas.",
  },
  {
    q: "When will Cylix be available, and how much will it cost?",
    a: "We're shipping a limited first wave soon. Final pricing will be announced before then, reserving now locks in early-access founder pricing.",
  },
  {
    q: "How do I reserve one? Is payment required?",
    a: "Tap any 'Reserve' button to fill out a short form. By default no payment is required to reserve, you'll only be charged when we confirm your unit is ready to ship.",
  },
];

export function FAQ() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-12 md:px-8">
        <div ref={ref} className="reveal md:col-span-4">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Honest answers.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Still wondering something?{" "}
            <a href="#contact" className="text-foreground underline-offset-4 hover:underline">
              Ask us directly →
            </a>
          </p>
        </div>
        <div className="md:col-span-8">
          <Accordion type="single" collapsible className="w-full divide-y divide-border">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`} className="border-0">
                <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-6 text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
