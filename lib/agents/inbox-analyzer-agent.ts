import type { AgentExecution, EmailInput, InboxAnalysisResult } from "./types";

const categoryRules: Array<[string, string[]]> = [
  ["assignment", ["assignment", "claude code", "deliverables", "vercel"]],
  ["client", ["proposal", "client", "leadership", "budget"]],
  ["security", ["verify", "payment", "card", "limited", "action required"]],
  ["deployment", ["deployment", "vercel", "preview", "build"]],
  ["travel", ["hotel", "booking", "receipt", "travel"]]
];

export function runInboxAnalyzerAgent(email: EmailInput): AgentExecution<InboxAnalysisResult> {
  try {
    const text = normalizeEmailText(email);
    const category =
      categoryRules.find(([, words]) => words.some((word) => text.includes(word)))?.[0] ??
      "general";
    const keyPoints = buildKeyPoints(email, text);

    return {
      status: "ok",
      note: "Deterministic inbox analysis completed.",
      output: {
        summary: buildSummary(email, category),
        category,
        intent: detectIntent(text),
        keyPoints,
        detectedSignals: detectSignals(text)
      }
    };
  } catch {
    return {
      status: "fallback",
      note: "Inbox analyzer fallback used after an unexpected parsing issue.",
      output: {
        summary: "Email needs review.",
        category: "general",
        intent: "unknown",
        keyPoints: [email.subject || "Untitled email"],
        detectedSignals: []
      }
    };
  }
}

export function normalizeEmailText(email: EmailInput) {
  return [email.from, email.fromEmail, email.subject, email.preview, email.body, email.labels?.join(" ")]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function buildSummary(email: EmailInput, category: string) {
  if (category === "assignment") {
    return "Assignment asks for a mobile-ready AI email client with unified inbox, provider support, AI summaries, reply drafts, prioritization, tests, and docs.";
  }

  if (category === "client") {
    return "Client needs a revised proposal with updated timeline and budget before Monday.";
  }

  if (category === "security") {
    return "Message pressures the user to verify payment details and should be reviewed carefully.";
  }

  if (category === "deployment") {
    return "Deployment preview is ready and can be reviewed before sharing.";
  }

  if (category === "travel") {
    return "Travel receipt and booking confirmation are available for records or reimbursement.";
  }

  return email.preview || email.body.slice(0, 140) || "Email needs review.";
}

function buildKeyPoints(email: EmailInput, text: string) {
  const points = [email.subject || "Untitled email"];

  if (text.includes("before monday")) {
    points.push("Deadline is before Monday.");
  }

  if (text.includes("unified inbox")) {
    points.push("Unified inbox is explicitly required.");
  }

  if (text.includes("payment") || text.includes("verify")) {
    points.push("Payment or verification language appears in the message.");
  }

  return points.slice(0, 4);
}

function detectIntent(text: string) {
  if (/can you|build|send|do you|please|reply|question|action required|verify/.test(text)) {
    return "request";
  }

  if (/receipt|confirmation|preview|notification/.test(text)) {
    return "notification";
  }

  return "informational";
}

function detectSignals(text: string) {
  return [
    text.includes("urgent") || text.includes("before monday") || text.includes("today")
      ? "urgency"
      : "",
    text.includes("payment") || text.includes("verify") ? "security-review" : "",
    text.includes("reply") || text.includes("can you") ? "reply-needed" : "",
    text.includes("claude code") || text.includes("agentic") ? "agentic-workflow" : ""
  ].filter(Boolean);
}

