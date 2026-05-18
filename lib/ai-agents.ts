import { runSemanticSearchAgent } from "./agents/semantic-search-agent";
import type { EmailInput } from "./agents/types";
import { runEmailWorkflowOrchestrator } from "./orchestrator/email-workflow-orchestrator";
import type { AIInsight, Email } from "./types";

export function analyzeEmail(email: Email): AIInsight {
  const result = runEmailWorkflowOrchestrator(toEmailInput(email));

  return {
    summary: result.summary,
    priority: result.priority,
    replyNeeded: result.replyNeeded,
    securityRisk: result.securityRisk,
    securityReason: result.securityReasons.join(" "),
    suggestedAction: result.suggestedAction,
    replyDraft: result.replyDraft,
    followUp: result.followUpRecommendation
  };
}

export function searchEmails(emails: Email[], query: string): Email[] {
  const emailInputs = emails.map(toEmailInput);
  const sourceById = new Map(emails.map((email) => [email.id, email]));

  const result = runSemanticSearchAgent(emailInputs, query, (email) => {
    const source = sourceById.get(email.id);
    const workflow = runEmailWorkflowOrchestrator(email);

    return [
      email.from,
      email.fromEmail,
      email.subject,
      email.preview,
      email.body,
      email.labels?.join(" "),
      source?.labels.join(" "),
      workflow.summary,
      workflow.category,
      workflow.intent,
      workflow.priority,
      workflow.securityRisk,
      workflow.suggestedAction,
      workflow.replyDraft
    ]
      .filter(Boolean)
      .join(" ");
  });

  return result.output.matches
    .map((match) => sourceById.get(match.id))
    .filter((email): email is Email => Boolean(email));
}

export function toEmailInput(email: Email): EmailInput {
  return {
    id: email.id,
    accountId: email.accountId,
    from: email.from,
    fromEmail: email.fromEmail,
    subject: email.subject,
    preview: email.preview,
    body: email.body,
    receivedAt: email.receivedAt,
    labels: email.labels
  };
}
