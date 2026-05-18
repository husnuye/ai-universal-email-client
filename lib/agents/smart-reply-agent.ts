import type {
  AgentExecution,
  EmailInput,
  InboxAnalysisResult,
  PriorityResult,
  SecurityResult,
  SmartReplyResult
} from "./types";

export function runSmartReplyAgent(
  email: EmailInput,
  analysis: InboxAnalysisResult,
  priority: PriorityResult,
  security: SecurityResult
): AgentExecution<SmartReplyResult> {
  try {
    return {
      status: "ok",
      note: "Smart reply draft generated with deterministic fallback copy.",
      output: {
        draft: buildDraft(email, analysis, priority, security),
        tone: "professional",
        confidence: security.risk === "high" ? 0.72 : 0.88
      }
    };
  } catch {
    return {
      status: "fallback",
      note: "Smart reply fallback used.",
      output: {
        draft: "Hi, thanks for the message. I will review this and follow up shortly.",
        tone: "professional",
        confidence: 0.5
      }
    };
  }
}

function buildDraft(
  email: EmailInput,
  analysis: InboxAnalysisResult,
  priority: PriorityResult,
  security: SecurityResult
) {
  if (security.risk === "high") {
    return "I will verify this request through the official account portal before taking any action.";
  }

  if (analysis.category === "assignment") {
    return "Hi Taj, thanks for the assignment. I will send the live Vercel URL, CLAUDE.md, architecture notes, agent workflow, and test summary once the MVP is ready.";
  }

  if (analysis.category === "client") {
    return "Hi Maya, yes, I can send the revised proposal before Monday morning. I will update the timeline and budget and share it for review.";
  }

  if (priority.replyNeeded) {
    return `Hi ${email.from.split(" ")[0]}, thanks for following up. I will review this and get back to you with the next step.`;
  }

  return "No reply is required right now, but this message has been summarized for reference.";
}

