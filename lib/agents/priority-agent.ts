import type { AgentExecution, EmailInput, InboxAnalysisResult, PriorityResult } from "./types";
import { normalizeEmailText } from "./inbox-analyzer-agent";

export function runPriorityAgent(
  email: EmailInput,
  analysis: InboxAnalysisResult
): AgentExecution<PriorityResult> {
  try {
    const text = normalizeEmailText(email);
    const urgencyHits = ["urgent", "today", "before monday", "action required", "deadline"].filter(
      (word) => text.includes(word)
    );
    const assignmentBoost = analysis.category === "assignment" ? 30 : 0;
    const replyNeeded = analysis.intent === "request" || /can you|do you|send|build/.test(text);
    const score = Math.min(100, 35 + urgencyHits.length * 20 + assignmentBoost + (replyNeeded ? 10 : 0));
    const priority = score >= 70 ? "high" : score >= 45 ? "medium" : "low";

    return {
      status: "ok",
      note: "Priority score generated from urgency, category, and reply signals.",
      output: {
        priority,
        score,
        replyNeeded,
        urgencyReason:
          urgencyHits.length > 0
            ? `Detected urgency signals: ${urgencyHits.join(", ")}.`
            : "No explicit deadline or urgency language detected."
      }
    };
  } catch {
    return {
      status: "fallback",
      note: "Priority fallback used.",
      output: {
        priority: "medium",
        score: 50,
        replyNeeded: false,
        urgencyReason: "Fallback priority assigned because scoring failed."
      }
    };
  }
}

