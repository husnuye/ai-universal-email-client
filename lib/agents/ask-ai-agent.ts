import type { AskAIResult, EmailInput, EmailWorkflowResult } from "./types";

export const askAITraceSteps = [
  "Inbox Analyzer running...",
  "Priority Agent running...",
  "Security Agent running...",
  "Smart Reply Agent running...",
  "Follow-Up Agent running...",
  "Final response ready"
];

export function runAskAIAgent(
  question: string,
  email: EmailInput,
  workflow: EmailWorkflowResult
): AskAIResult {
  const normalized = question.trim().toLowerCase();
  const intent = detectAskAIIntent(normalized);

  return {
    intent,
    trace: askAITraceSteps,
    answer: buildAnswer(intent, normalized, email, workflow)
  };
}

function detectAskAIIntent(question: string): AskAIResult["intent"] {
  if (/summary|summarize|recap|what is this/.test(question)) {
    return "summary";
  }

  if (/reply|draft|respond|answer/.test(question)) {
    return "reply";
  }

  if (/suspicious|security|risk|phishing|safe/.test(question)) {
    return "security";
  }

  if (/follow|next step|needs action|follow-up/.test(question)) {
    return "follow-up";
  }

  return "general";
}

function buildAnswer(
  intent: AskAIResult["intent"],
  question: string,
  email: EmailInput,
  workflow: EmailWorkflowResult
) {
  if (intent === "summary") {
    return `Summary: ${workflow.summary} Priority is ${workflow.priority} with a score of ${workflow.priorityScore}.`;
  }

  if (intent === "reply") {
    return `Draft reply: ${workflow.replyDraft}`;
  }

  if (intent === "security") {
    return `Security read: risk is ${workflow.securityRisk}. ${workflow.securityReasons.join(" ")} Suggested action: ${workflow.suggestedAction}`;
  }

  if (intent === "follow-up") {
    return `Follow-up: ${workflow.followUpRecommendation} Suggested action: ${workflow.suggestedAction}`;
  }

  const questionLead = question ? `For "${question}": ` : "";

  return `${questionLead}${email.subject} is a ${workflow.priority}-priority ${workflow.category} email. ${workflow.summary} Recommended next action: ${workflow.suggestedAction}`;
}
