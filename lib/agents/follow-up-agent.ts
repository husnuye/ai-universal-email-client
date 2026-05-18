import type {
  AgentExecution,
  EmailInput,
  FollowUpResult,
  PriorityResult,
  SecurityResult
} from "./types";

export function runFollowUpAgent(
  email: EmailInput,
  priority: PriorityResult,
  security: SecurityResult
): AgentExecution<FollowUpResult> {
  try {
    const needsReview = security.risk !== "low";
    const needed = priority.replyNeeded || priority.priority === "high" || needsReview;

    return {
      status: "ok",
      note: "Follow-up recommendation generated from priority and security outputs.",
      output: {
        needed,
        recommendation: needed
          ? "Keep this thread visible until the next action is complete."
          : "No follow-up required right now.",
        suggestedAction: buildSuggestedAction(email, priority, security)
      }
    };
  } catch {
    return {
      status: "fallback",
      note: "Follow-up fallback used.",
      output: {
        needed: true,
        recommendation: "Review this message manually.",
        suggestedAction: "Open the email and decide the next step."
      }
    };
  }
}

function buildSuggestedAction(email: EmailInput, priority: PriorityResult, security: SecurityResult) {
  if (security.risk === "high") {
    return "Do not click links until sender and URL are verified.";
  }

  const text = `${email.subject} ${email.body}`.toLowerCase();

  if (text.includes("assignment") || text.includes("claude code")) {
    return "Ship a focused MVP, document the agent workflow, add tests, and deploy to Vercel.";
  }

  if (priority.priority === "high") {
    return "Respond today and keep the thread pinned until complete.";
  }

  return priority.replyNeeded
    ? "Reply when the current MVP scope is confirmed."
    : "Archive or label after review.";
}

