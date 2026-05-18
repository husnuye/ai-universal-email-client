import { describe, expect, it } from "vitest";
import { runAskAIAgent } from "../lib/agents/ask-ai-agent";
import { runEmailWorkflowOrchestrator } from "../lib/orchestrator/email-workflow-orchestrator";
import { urgentSuspiciousEmail } from "./agent-fixtures";

const workflow = runEmailWorkflowOrchestrator(urgentSuspiciousEmail);

describe("Ask AI Agent", () => {
  it("returns a summary-style answer", () => {
    const result = runAskAIAgent("Summarize this thread", urgentSuspiciousEmail, workflow);

    expect(result.intent).toBe("summary");
    expect(result.answer).toContain("Summary:");
  });

  it("returns a draft-style answer", () => {
    const result = runAskAIAgent("Draft a reply", urgentSuspiciousEmail, workflow);

    expect(result.intent).toBe("reply");
    expect(result.answer).toContain("Draft reply:");
  });

  it("returns a security-style answer", () => {
    const result = runAskAIAgent("Is this suspicious?", urgentSuspiciousEmail, workflow);

    expect(result.intent).toBe("security");
    expect(result.answer).toContain("Security read:");
  });

  it("returns a follow-up-style answer", () => {
    const result = runAskAIAgent("What needs follow-up?", urgentSuspiciousEmail, workflow);

    expect(result.intent).toBe("follow-up");
    expect(result.answer).toContain("Follow-up:");
  });

  it("returns a helpful generic answer", () => {
    const result = runAskAIAgent("What should I do?", urgentSuspiciousEmail, workflow);

    expect(result.intent).toBe("general");
    expect(result.answer).toContain("Recommended next action");
  });
});
