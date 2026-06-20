import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GaugeMark } from "./Logo";
import { SITE, PRICING } from "@/config/site";
import { Check, ArrowRight, ArrowLeft, Minus, Plus, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { submitReservation } from "@/lib/reservations";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^03\d{9}$/, "Use Pakistani format: 03XXXXXXXXX"),
  email: z
    .union([z.string().trim().email("Invalid email"), z.literal("")])
    .optional(),
  street: z.string().trim().min(3, "Street is required").max(160),
  city: z.string().trim().min(2, "City is required").max(60),
  quantity: z.number().int().min(1).max(20),
  payment: z.enum(["online", "cod"]),
  notes: z.string().max(500).optional(),
});

type ReserveData = z.infer<typeof schema>;

export function ReserveModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [data, setData] = useState<ReserveData>({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    quantity: 1,
    payment: PRICING.DEPOSIT_AMOUNT > 0 ? "online" : "cod",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setStep(1);
      setOrderId(null);
      setErrors({});
    }
  }, [open]);

  function validateStep1() {
    const part = schema.pick({
      name: true,
      phone: true,
      email: true,
      street: true,
      city: true,
      quantity: true,
    });
    const r = part.safeParse(data);
    if (!r.success) {
      const e: Record<string, string> = {};
      for (const i of r.error.issues) e[i.path.join(".")] = i.message;
      setErrors(e);
      return false;
    }
    setErrors({});
    return true;
  }

  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    const r = schema.safeParse(data);
    if (!r.success) {
      toast.error("Please check your details.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitReservation({ data: r.data });
      setOrderId(result.orderId);
      setStep(4);
      if (result.emailSent) {
        toast.success("Reservation locked in 🎉");
      } else {
        // Reservation still succeeded — just let the team know email is flaky
        // (most likely a GMAIL_USER / GMAIL_APP_PASSWORD env var issue server-side).
        toast.success("Reservation locked in 🎉 (confirmation email may be delayed)");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong submitting your reservation. Please try again or message us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl overflow-hidden border-border bg-surface p-0 sm:rounded-3xl">
        {/* Step indicator */}
        <div className="flex items-center justify-between border-b border-border px-6 pt-6">
          <DialogHeader className="text-left">
            <DialogTitle className="font-display text-xl font-semibold">
              {step === 4 ? "You're in." : "Reserve your Cylix"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {step === 4
                ? "We'll be in touch as we get closer to ship."
                : `Step ${step} of 3, takes under a minute.`}
            </DialogDescription>
          </DialogHeader>
          <GaugeMark size={36} />
        </div>

        {step !== 4 && <Progress step={step} />}

        <div className="max-h-[70vh] overflow-y-auto px-6 pb-6">
          {step === 1 && (
            <Step1
              data={data}
              setData={setData}
              errors={errors}
              onNext={() => validateStep1() && setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2
              data={data}
              setData={setData}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <Step3 data={data} onBack={() => setStep(2)} onSubmit={submit} submitting={submitting} />
          )}
          {step === 4 && orderId && <Success orderId={orderId} email={data.email} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div className="px-6 py-4">
      <div className="flex h-1.5 gap-1.5">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="h-full flex-1 overflow-hidden rounded-full bg-white/5"
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: step >= s ? "100%" : "0%",
                background: "var(--gradient-gas)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
      {error ? (
        <span role="alert" className="text-xs" style={{ color: "#E84C3D" }}>
          {error}
        </span>
      ) : hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  );
}

function Step1({
  data,
  setData,
  errors,
  onNext,
}: {
  data: ReserveData;
  setData: React.Dispatch<React.SetStateAction<ReserveData>>;
  errors: Record<string, string>;
  onNext: () => void;
}) {
  return (
    <div className="grid gap-4 pt-2" style={{ animation: "fade-up .4s both" }}>
      <Field label="Full name" error={errors.name}>
        <Input
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Ali Raza"
          maxLength={80}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone} hint="03XXXXXXXXX">
          <Input
            type="tel"
            inputMode="numeric"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            placeholder="03001234567"
            maxLength={11}
          />
        </Field>
        <Field label="Email (optional)" error={errors.email}>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="you@email.com"
            maxLength={120}
          />
        </Field>
      </div>
      <Field label="Street address" error={errors.street}>
        <Input
          value={data.street}
          onChange={(e) => setData({ ...data, street: e.target.value })}
          placeholder="House 12, Street 4, Gulberg"
          maxLength={160}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City" error={errors.city}>
          <Input
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            placeholder="Lahore"
            maxLength={60}
          />
        </Field>
        <Field label="Quantity">
          <div className="inline-flex h-10 items-center rounded-md border border-border bg-background">
            <button
              type="button"
              aria-label="Decrease"
              onClick={() =>
                setData({ ...data, quantity: Math.max(1, data.quantity - 1) })
              }
              className="grid h-full w-10 place-items-center text-muted-foreground hover:text-foreground"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="flex-1 text-center font-display text-sm font-semibold tabular-nums">
              {data.quantity}
            </div>
            <button
              type="button"
              aria-label="Increase"
              onClick={() =>
                setData({ ...data, quantity: Math.min(20, data.quantity + 1) })
              }
              className="grid h-full w-10 place-items-center text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </Field>
      </div>

      <button
        onClick={onNext}
        className="btn-brand mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"

      >
        Continue <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Step2({
  data,
  setData,
  onBack,
  onNext,
}: {
  data: ReserveData;
  setData: React.Dispatch<React.SetStateAction<ReserveData>>;
  onBack: () => void;
  onNext: () => void;
}) {
  const showOnline = PRICING.DEPOSIT_AMOUNT > 0;
  return (
    <div className="grid gap-4 pt-2" style={{ animation: "fade-up .4s both" }}>
      <p className="rounded-xl border border-border bg-background/50 p-4 text-xs text-muted-foreground">
        Cylix is still in development. Reserving now locks in early-access pricing, we
        won't charge you until your unit is confirmed and ready to ship.
      </p>

      <PaymentOption
        active={data.payment === "cod"}
        onClick={() => setData({ ...data, payment: "cod" })}
        title={showOnline ? "Cash on delivery" : "Pay later, just reserve"}
        body={
          showOnline
            ? "We deliver, you pay cash on the doorstep."
            : "No charge today. We'll confirm pricing and your unit before any payment."
        }
      />

      {showOnline && (
        <PaymentOption
          active={data.payment === "online"}
          onClick={() => setData({ ...data, payment: "online" })}
          title="Pay deposit online (card)"
          body={`${PRICING.CURRENCY} ${PRICING.DEPOSIT_AMOUNT} refundable deposit. Counts toward final price.`}
        />
      )}

      <Field label="Anything we should know? (optional)">
        <Textarea
          value={data.notes ?? ""}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
          placeholder="Best delivery time, gate code, dhaba name…"
          rows={3}
          maxLength={500}
        />
      </Field>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="btn-brand inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold"

        >
          Review <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function PaymentOption({
  active,
  onClick,
  title,
  body,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  body: string;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl border p-4 transition-colors"
      style={{
        borderColor: active ? "rgba(60,181,74,.55)" : "var(--border)",
        background: active ? "rgba(60,181,74,.06)" : "rgba(255,255,255,.02)",
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border"
          style={{
            borderColor: active ? "#3CB54A" : "var(--border)",
            background: active ? "#3CB54A" : "transparent",
          }}
        >
          {active && <Check className="h-3 w-3 text-[#0B0E0C]" strokeWidth={3} />}
        </span>
        <div>
          <div className="font-semibold text-foreground">{title}</div>
          <div className="mt-1 text-xs text-muted-foreground">{body}</div>
        </div>
      </div>
    </button>
  );
}

function Step3({
  data,
  onBack,
  onSubmit,
  submitting,
}: {
  data: ReserveData;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  return (
    <div className="grid gap-4 pt-2" style={{ animation: "fade-up .4s both" }}>
      <div className="rounded-2xl border border-border bg-background/50 p-5">
        <Row label="Name" value={data.name} />
        <Row label="Phone" value={data.phone} />
        {data.email && <Row label="Email" value={data.email} />}
        <Row label="Address" value={`${data.street}, ${data.city}`} />
        <Row label="Quantity" value={String(data.quantity)} />
        <Row
          label="Payment"
          value={data.payment === "online" ? "Card (online)" : "Cash on delivery / Pay later"}
        />
        {data.notes && <Row label="Notes" value={data.notes} />}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="btn-brand inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Confirm reservation"}{" "}
          {!submitting && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-2.5 text-sm last:border-0 last:pb-0 first:pt-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function Success({ orderId, email }: { orderId: string; email?: string }) {
  const waLink = `${SITE.whatsappLink}?text=${encodeURIComponent(
    `Hi, I just reserved Cylix. Order ID: ${orderId}`
  )}`;
  return (
    <div className="flex flex-col items-center px-2 py-6 text-center">
      <div
        className="grid h-20 w-20 place-items-center rounded-full"
        style={{
          background: "rgba(60,181,74,.12)",
          border: "1px solid rgba(60,181,74,.35)",
        }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="#3CB54A"
            strokeWidth="2.5"
            strokeDasharray="126"
            strokeDashoffset="126"
            style={{ animation: "draw 1s .1s ease-out forwards" }}
          />
          <path
            d="M13 22.5l6 6 12-13"
            stroke="#3CB54A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="40"
            strokeDashoffset="40"
            style={{ animation: "draw .6s .9s ease-out forwards" }}
          />
        </svg>
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold">Reservation confirmed</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Your order ID is{" "}
        <span className="font-display font-semibold text-foreground">{orderId}</span>.
        {email
          ? " A confirmation email is on its way."
          : " We'll be in touch on WhatsApp as we get closer to launch."}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="btn-brand inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold"
          style={{ background: "#25D366" }}
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
