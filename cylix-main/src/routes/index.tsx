import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/cylix/Navbar";
import { Hero } from "@/components/cylix/Hero";
import { HowItWorks } from "@/components/cylix/HowItWorks";
import { Features } from "@/components/cylix/Features";
import { UseCases } from "@/components/cylix/UseCases";
import { InteractiveGauge } from "@/components/cylix/InteractiveGauge";
import { ReserveSection } from "@/components/cylix/ReserveSection";
import { OurStory } from "@/components/cylix/OurStory";
import { FAQ } from "@/components/cylix/FAQ";
import { FinalCTA } from "@/components/cylix/FinalCTA";
import { Footer } from "@/components/cylix/Footer";
import { WhatsAppFloat } from "@/components/cylix/WhatsAppFloat";
import { ReserveModal } from "@/components/cylix/ReserveModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cylix, Real-time LPG gas level for Pakistani homes & dhabas" },
      {
        name: "description",
        content:
          "Cylix is a smart sensor that straps to any LPG cylinder and gives you an accurate, real-time reading of how much gas is left. Reserve yours.",
      },
      { property: "og:title", content: "Cylix, Real Time Gas Level" },
      {
        property: "og:description",
        content:
          "Never run out of gas without warning. Cylix monitors your LPG cylinder in real time, with a precision, gram-accurate gas level reading.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const reserve = () => setOpen(true);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar onReserve={reserve} />
      <main>
        <Hero onReserve={reserve} />
        <HowItWorks />
        <Features />
        <UseCases />
        <InteractiveGauge />
        <ReserveSection onReserve={reserve} />
        <OurStory />
        <FAQ />
        <FinalCTA onReserve={reserve} />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ReserveModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
