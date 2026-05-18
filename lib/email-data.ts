import type { Account, Email } from "./types";

export const accounts: Account[] = [
  {
    id: "acc-gmail",
    provider: "gmail",
    name: "Gmail",
    address: "husnuye@gmail.com",
    color: "#db6b5d"
  },
  {
    id: "acc-office",
    provider: "office365",
    name: "Office 365",
    address: "husnuye@company.com",
    color: "#315c72"
  },
  {
    id: "acc-yahoo",
    provider: "imap",
    name: "Yahoo IMAP",
    address: "husnuye@yahoo.com",
    color: "#7c3aed"
  },
  {
    id: "acc-aol",
    provider: "imap",
    name: "AOL IMAP",
    address: "husnuye@aol.com",
    color: "#6f8f79"
  }
];

export const emails: Email[] = [
  {
    id: "mail-1",
    accountId: "acc-gmail",
    from: "Taj Haslani",
    fromEmail: "taj@aptask.com",
    subject: "AI-first email client assignment",
    preview: "Build an AI-first universal email client as a mobile-ready PWA.",
    body: "We are evaluating what you can ship with Claude Code and agentic workflows. Build an AI-first universal email client as a mobile-ready PWA. Email only, no contacts/tasks/notes/calendar. Support Gmail, Office 365, and IMAP with a unified inbox, account switching, compose, reply, forward, search, labels, archive/delete, AI summaries, reply drafts, and prioritization.",
    receivedAt: "2026-05-14T16:03:00.000Z",
    labels: ["assignment", "important"],
    unread: true,
    archived: false,
    deleted: false
  },
  {
    id: "mail-2",
    accountId: "acc-office",
    from: "Maya Chen",
    fromEmail: "maya@northstar.co",
    subject: "Proposal edits needed before Monday",
    preview: "Can you send a revised proposal with the new timeline and budget?",
    body: "Can you send a revised proposal with the new timeline and budget before Monday morning? Leadership wants to review it before the client call.",
    receivedAt: "2026-05-17T09:20:00.000Z",
    labels: ["client", "proposal"],
    unread: true,
    archived: false,
    deleted: false
  },
  {
    id: "mail-3",
    accountId: "acc-aol",
    from: "AOL Billing",
    fromEmail: "billing-alert@aol-secure.example",
    subject: "Action required: verify payment method",
    preview: "Your account will be limited unless you verify your payment method.",
    body: "Your account will be limited unless you verify your payment method today. Click the secure verification link and confirm your card details.",
    receivedAt: "2026-05-17T06:45:00.000Z",
    labels: ["billing"],
    unread: false,
    archived: false,
    deleted: false
  },
  {
    id: "mail-6",
    accountId: "acc-yahoo",
    from: "Yahoo Travel",
    fromEmail: "receipts@yahoo.example",
    subject: "Receipt for hotel booking",
    preview: "Your hotel receipt and booking confirmation are attached.",
    body: "Your hotel receipt and booking confirmation are attached. Keep this for reimbursement and travel records.",
    receivedAt: "2026-05-14T08:30:00.000Z",
    labels: ["travel", "receipt"],
    unread: false,
    archived: false,
    deleted: false
  },
  {
    id: "mail-4",
    accountId: "acc-gmail",
    from: "Vercel",
    fromEmail: "notifications@vercel.com",
    subject: "Deployment preview ready",
    preview: "Your deployment preview is ready for review.",
    body: "Your deployment preview is ready. Review the build output and share the URL with your team when the final checks pass.",
    receivedAt: "2026-05-16T21:10:00.000Z",
    labels: ["deployment"],
    unread: false,
    archived: false,
    deleted: false
  },
  {
    id: "mail-5",
    accountId: "acc-office",
    from: "Jordan Lee",
    fromEmail: "jordan@workspace.dev",
    subject: "Following up on integration notes",
    preview: "Do you still need the OAuth notes for Gmail and Microsoft Graph?",
    body: "Following up on the provider integration notes. Do you still need the OAuth notes for Gmail and Microsoft Graph, or should I wait until the MVP is approved?",
    receivedAt: "2026-05-15T12:12:00.000Z",
    labels: ["engineering", "follow-up"],
    unread: false,
    archived: false,
    deleted: false
  }
];
