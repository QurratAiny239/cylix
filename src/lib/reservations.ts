import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendCustomerConfirmation, sendTeamNotification } from "./email";

const orderSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .regex(/^03\d{9}$/, "Use Pakistani format: 03XXXXXXXXX"),
  email: z.union([z.string().trim().email(), z.literal("")]).optional(),
  street: z.string().trim().min(3).max(160),
  city: z.string().trim().min(2).max(60),
  quantity: z.number().int().min(1).max(20),
  payment: z.enum(["online", "cod"]),
  notes: z.string().max(500).optional(),
});

function generateOrderId() {
  return "CYX-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

/**
 * Server function: validates the reservation, generates an order ID, and
 * sends BOTH the customer confirmation email (if an email was given) and
 * the team notification email to cylixteam05@gmail.com.
 *
 * Email failures are logged but never block the reservation itself —
 * the customer should still see "reservation confirmed" even if, say,
 * Gmail is briefly unreachable. We surface a `emailSent` flag back to the
 * client so the UI can be honest about whether a confirmation email went out.
 */
export const submitReservation = createServerFn({ method: "POST" })
  .validator(orderSchema)
  .handler(async ({ data }) => {
    const orderId = generateOrderId();
    const order = { ...data, orderId };

    let emailSent = false;
    try {
      await Promise.all([
        sendCustomerConfirmation(order),
        sendTeamNotification(order),
      ]);
      emailSent = true;
    } catch (err) {
      // Don't fail the reservation just because email delivery had an issue —
      // log it server-side so the team can investigate (check GMAIL_USER /
      // GMAIL_APP_PASSWORD env vars first, that's the most common cause).
      console.error("[Cylix] Failed to send reservation emails:", err);
    }

    return { orderId, emailSent };
  });
