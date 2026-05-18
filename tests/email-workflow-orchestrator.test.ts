import { describe, expect, it } from "vitest";
import { runEmailWorkflowOrchestrator } from "../lib/orchestrator/email-workflow-orchestrator";
import { urgentSuspiciousEmail } from "./agent-fixtures";

describe("Email Workflow Orchestrator", () => {
  it("runs the full agentic pipeline for urgent suspicious email", () => {
    const result = runEmailWorkflowOrchestrator(urgentSuspiciousEmail);

    expect(result.priority).toBe("high");
    expect(result.securityWarning).toBe(true);
    expect(result.securityRisk).toBe("high");
    expect(result.summary).toContain("payment");
    expect(result.suggestedAction).toContain("Do not click");
    expect(result.replyDraft).toContain("official account portal");
    expect(result.agentTrace.map((step) => step.agent)).toEqual([
      "Inbox Analyzer Agent",
      "Priority Agent",
      "Security Agent",
      "Smart Reply Agent",
      "Follow-Up Agent"
    ]);
  });
});
