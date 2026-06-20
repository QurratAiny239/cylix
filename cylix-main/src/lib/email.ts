import nodemailer from "nodemailer";

/**
 * Server-only email sender for Cylix order notifications.
 *
 * Requires two environment variables (set these in your hosting provider's
 * dashboard, e.g. Vercel/Netlify "Environment Variables", or in a local
 * .env file for development — never commit real values):
 *
 *   GMAIL_USER          -> cylixteam05@gmail.com
 *   GMAIL_APP_PASSWORD  -> a 16-character Gmail "App Password"
 *                          (NOT your normal Gmail login password)
 *
 * How to get a Gmail App Password:
 *   1. Go to https://myaccount.google.com/security
 *   2. Turn on 2-Step Verification (required for App Passwords to appear)
 *   3. Go to https://myaccount.google.com/apppasswords
 *   4. Create one for "Mail" / "Other (Cylix Website)"
 *   5. Copy the 16-character password it gives you into GMAIL_APP_PASSWORD
 */

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "Email is not configured: GMAIL_USER and/or GMAIL_APP_PASSWORD environment variables are missing. " +
        "See src/lib/email.ts for setup instructions."
    );
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return cachedTransporter;
}

export type OrderEmailPayload = {
  orderId: string;
  name: string;
  phone: string;
  email?: string;
  street: string;
  city: string;
  quantity: number;
  payment: "online" | "cod";
  notes?: string;
};

function formatOrderHtml(o: OrderEmailPayload, audience: "customer" | "team") {
  const rows: Array<[string, string]> = [
    ["Order ID", o.orderId],
    ["Name", o.name],
    ["Phone", o.phone],
    ...(o.email ? ([["Email", o.email]] as [string, string][]) : []),
    ["Address", `${o.street}, ${o.city}`],
    ["Quantity", String(o.quantity)],
    ["Payment method", o.payment === "online" ? "Card (online)" : "Cash on Delivery"],
    ...(o.notes ? ([["Notes", o.notes]] as [string, string][]) : []),
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#666;font-size:13px;">${label}</td><td style="padding:6px 12px;font-size:13px;font-weight:600;">${value}</td></tr>`
    )
    .join("");

  const intro =
    audience === "customer"
      ? `<p style="font-size:15px;line-height:1.6;color:#333;">Hi ${o.name},</p>
         <p style="font-size:15px;line-height:1.6;color:#333;">Thanks for reserving a Cylix! Your reservation is confirmed — no payment has been taken yet beyond what you selected below. We'll be in touch as we get closer to shipping the first wave.</p>`
      : `<p style="font-size:15px;line-height:1.6;color:#333;">New Cylix reservation received:</p>`;

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#1B1F1D;">${audience === "customer" ? "Your Cylix reservation is confirmed 🎉" : "New Cylix Order"}</h2>
      ${intro}
      <table style="width:100%;border-collapse:collapse;margin-top:12px;background:#fafafa;border-radius:8px;overflow:hidden;">
        ${rowsHtml}
      </table>
      <p style="font-size:13px;color:#888;margin-top:20px;">Cylix — Real Time Gas Level</p>
    </div>
  `;
}

/** Sends the customer confirmation email (only if they gave an email). */
export async function sendCustomerConfirmation(order: OrderEmailPayload) {
  if (!order.email) return;
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Cylix" <${process.env.GMAIL_USER}>`,
    to: order.email,
    subject: "Your Cylix Reservation is Confirmed 🎉",
    html: formatOrderHtml(order, "customer"),
  });
}

/** Sends a copy of every order to the Cylix team inbox. */
export async function sendTeamNotification(order: OrderEmailPayload) {
  const transporter = getTransporter();
  const teamEmail = process.env.GMAIL_USER; // cylixteam05@gmail.com
  await transporter.sendMail({
    from: `"Cylix Website" <${process.env.GMAIL_USER}>`,
    to: teamEmail,
    subject: `New Reservation: ${order.orderId}`,
    html: formatOrderHtml(order, "team"),
  });
}

/** Sends a generic contact-form message to the Cylix team inbox. */
export async function sendContactMessage(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Cylix Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: payload.email,
    subject: `New contact form message from ${payload.name}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;">
        <h2>New message from the Cylix website</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;">${payload.message}</p>
      </div>
    `,
  });
}
