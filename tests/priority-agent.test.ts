import { describe, expect, it } from "vitest";
import { runInboxAnalyzerAgent } from "../lib/agents/inbox-analyzer-agent";
import { runPriorityAgent } from "../lib/agents/priority-agent";
import { urgentSuspiciousEmail } from "./agent-fixtures";

describe("Priority Agent", () => {
  it("marks urgent request emails as high priority", () => {
    const analysis = runInboxAnalyzerAgent(urgentSuspiciousEmail).output;
    const result = runPriorityAgent(urgentSuspiciousEmail, analysis);

    expect(result.status).toBe("ok");
    expect(result.output.priority).toBe("high");
    expect(result.output.replyNeeded).toBe(true);
    expect(result.output.score).toBeGreaterThanOrEqual(70);
  });
});
