import { Logo } from "./Logo";
import { SITE } from "@/config/site";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer id="contact" className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Logo size={40} />
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              Cylix is a Pakistani-built IoT gas monitor for households, dhabas and small
              businesses. Real-time. Honest. Quietly useful.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) {
                  toast.error("Please enter a valid email.");
                  return;
                }
                toast.success("You're on the launch list. We'll be in touch.");
                setEmail("");
              }}
              className="mt-8 flex w-full max-w-sm flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 min-w-0 flex-1 rounded-full border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="btn-brand inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
              >
                Notify me
              </button>
            </form>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: "How it works", href: "#how" },
              { label: "Features", href: "#features" },
              { label: "The Gauge", href: "#gauge" },
              { label: "FAQ", href: "#faq" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "Reserve", href: "#reserve" },
              { label: "Contact", href: "#contact" },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <MessageCircle className="h-4 w-4" style={{ color: "var(--gas-green)" }} />
              <span className="whitespace-nowrap">{SITE.whatsapp}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Mail className="h-4 w-4" />
              <span className="break-all">{SITE.email}</span>
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Cylix on Instagram"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Instagram className="h-4 w-4" />
              <span className="whitespace-nowrap">{SITE.instagram}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface transition-colors hover:bg-accent hover:text-foreground"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cylix. Real Time Gas Level. Made in Pakistan.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
