import { runFollowUpAgent } from "../agents/follow-up-agent";
import { runInboxAnalyzerAgent } from "../agents/inbox-analyzer-agent";
import { runPriorityAgent } from "../agents/priority-agent";
import { runSecurityAgent } from "../agents/security-agent";
import { runSmartReplyAgent } from "../agents/smart-reply-agent";
import type { AgentExecution, EmailInput, EmailWorkflowResult } from "../agents/types";

export function runEmailWorkflowOrchestrator(email: EmailInput): EmailWorkflowResult {
  const trace: EmailWorkflowResult["agentTrace"] = [];

  const analysis = record(trace, "Inbox Analyzer Agent", runInboxAnalyzerAgent(email));
  const priority = record(trace, "Priority Agent", runPriorityAgent(email, analysis));
  const security = record(trace, "Security Agent", runSecurityAgent(email));
  const smartReply = record(
    trace,
    "Smart Reply Agent",
    runSmartReplyAgent(email, analysis, priority, security)
  );
  const followUp = record(trace, "Follow-Up Agent", runFollowUpAgent(email, priority, security));

  return {
    emailId: email.id,
    summary: analysis.summary,
    category: analysis.category,
    intent: analysis.intent,
    keyPoints: analysis.keyPoints,
    detectedSignals: analysis.detectedSignals,
    priority: priority.priority,
    priorityScore: priority.score,
    replyNeeded: priority.replyNeeded,
    urgencyReason: priority.urgencyReason,
    securityRisk: security.risk,
    securityScore: security.score,
    securityWarning: security.warning,
    securityReasons: security.reasons,
    replyDraft: smartReply.draft,
    followUpNeeded: followUp.needed,
    followUpRecommendation: followUp.recommendation,
    suggestedAction: followUp.suggestedAction,
    agentTrace: trace
  };
}

function record<T>(
  trace: EmailWorkflowResult["agentTrace"],
  agent: string,
  execution: AgentExecution<T>
) {
  trace.push({
    agent,
    status: execution.status,
    note: execution.note
  });

  return execution.output;
}

