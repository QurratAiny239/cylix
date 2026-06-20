import { SITE } from "@/config/site";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href={SITE.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Cylix on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl transition-transform hover:scale-105"
      style={{
        background: "#25D366",
        boxShadow: "0 12px 30px -8px rgba(37,211,102,.55), 0 0 0 1px rgba(255,255,255,.1)",
      }}
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full"
        style={{ background: "#25D366", animation: "pulse-glow 2.8s ease-in-out infinite" }}
      />
    </a>
  );
}
