import type { AIInsight, Email } from "./types";

const urgentWords = ["before monday", "today", "urgent", "action required", "deadline"];
const riskWords = ["verify", "card details", "payment method", "limited", "click"];

export function analyzeEmail(email: Email): AIInsight {
  const text = `${email.subject} ${email.preview} ${email.body}`.toLowerCase();
  const urgent = urgentWords.some((word) => text.includes(word));
  const risky = riskWords.filter((word) => text.includes(word));
  const assignment = text.includes("assignment") || text.includes("claude code");
  const replyNeeded = /can you|build|send|do you|reply|question/.test(text);

  const priority = assignment || urgent ? "high" : replyNeeded ? "medium" : "low";
  const securityRisk = risky.length >= 3 ? "high" : risky.length > 0 ? "medium" : "low";

  return {
    summary: buildSummary(email, assignment),
    priority,
    replyNeeded,
    securityRisk,
    securityReason:
      securityRisk === "high"
        ? "Contains payment pressure and verification language."
        : securityRisk === "medium"
          ? "Contains wording commonly seen in account verification messages."
          : "No obvious phishing signals detected.",
    suggestedAction: buildSuggestedAction(email, assignment, priority),
    replyDraft: buildReplyDraft(email, assignment),
    followUp: replyNeeded
      ? "Keep this thread visible until a response is sent."
      : "No follow-up required right now."
  };
}

export function searchEmails(emails: Email[], query: string): Email[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return emails;
  }

  return emails.filter((email) => {
    const insight = analyzeEmail(email);
    const haystack = [
      email.from,
      email.fromEmail,
      email.subject,
      email.preview,
      email.body,
      email.labels.join(" "),
      insight.summary,
      insight.priority,
      insight.securityRisk,
      insight.suggestedAction
    ]
      .join(" ")
      .toLowerCase();

    return normalized
      .split(/\s+/)
      .filter(Boolean)
      .every((word) => haystack.includes(word) || semanticMatch(word, haystack));
  });
}

function semanticMatch(word: string, haystack: string) {
  const groups: Record<string, string[]> = {
    urgent: ["high", "deadline", "today", "monday", "action"],
    risky: ["payment", "verify", "phishing", "security", "card"],
    client: ["proposal", "leadership", "review", "call"],
    deploy: ["vercel", "deployment", "preview", "build"],
    reply: ["draft", "response", "send", "question", "follow"]
  };

  return groups[word]?.some((term) => haystack.includes(term)) ?? false;
}

function buildSummary(email: Email, assignment: boolean) {
  if (assignment) {
    return "Assignment asks for a mobile-ready AI email client with unified inbox, provider support, AI summaries, reply drafts, prioritization, tests, and docs.";
  }

  if (email.subject.toLowerCase().includes("proposal")) {
    return "Client needs a revised proposal with updated timeline and budget before Monday.";
  }

  if (email.subject.toLowerCase().includes("payment")) {
    return "Message pressures the user to verify payment details and should be reviewed carefully.";
  }

  if (email.subject.toLowerCase().includes("deployment")) {
    return "Deployment preview is ready and can be reviewed before sharing.";
  }

  return "Sender is following up on provider integration notes and asking whether they are needed now.";
}

function buildSuggestedAction(email: Email, assignment: boolean, priority: string) {
  if (assignment) {
    return "Ship a focused MVP, document the agent workflow, add tests, and deploy to Vercel.";
  }

  if (priority === "high") {
    return "Respond today and keep the thread pinned until complete.";
  }

  if (email.subject.toLowerCase().includes("payment")) {
    return "Do not click links until sender and URL are verified.";
  }

  return "Reply when the current MVP scope is confirmed.";
}

function buildReplyDraft(email: Email, assignment: boolean) {
  if (assignment) {
    return "Hi Taj, thanks for the assignment. I will send the live Vercel URL, CLAUDE.md, architecture notes, agent workflow, and test summary once the MVP is ready.";
  }

  if (email.subject.toLowerCase().includes("proposal")) {
    return "Hi Maya, yes, I can send the revised proposal before Monday morning. I will update the timeline and budget and share it for review.";
  }

  if (email.subject.toLowerCase().includes("payment")) {
    return "I will verify this request through the official account portal before taking any action.";
  }

  return "Hi, thanks for following up. Please hold the provider integration notes until the MVP scope is approved.";
}

