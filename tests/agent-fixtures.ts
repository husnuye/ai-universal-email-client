import type { EmailInput } from "../lib/agents/types";

export const urgentSuspiciousEmail: EmailInput = {
  id: "sample-risky",
  accountId: "acc-aol",
  provider: "imap",
  from: "AOL Billing",
  fromEmail: "billing-alert@aol-secure.example",
  subject: "Action required: verify payment method today",
  preview: "Your account will be limited unless you verify your payment method.",
  body: "Your account will be limited unless you verify your payment method today. Click the secure verification link and confirm your card details.",
  receivedAt: "2026-05-17T06:45:00.000Z",
  labels: ["billing"]
};
