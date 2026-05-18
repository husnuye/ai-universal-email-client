import { describe, expect, it } from "vitest";
import { runInboxAnalyzerAgent } from "../lib/agents/inbox-analyzer-agent";
import { runPriorityAgent } from "../lib/agents/priority-agent";
import { runSecurityAgent } from "../lib/agents/security-agent";
import { runSmartReplyAgent } from "../lib/agents/smart-reply-agent";
import { urgentSuspiciousEmail } from "./agent-fixtures";

describe("Smart Reply Agent", () => {
  it("generates a cautious reply for high-risk emails", () => {
    const analysis = runInboxAnalyzerAgent(urgentSuspiciousEmail).output;
    const priority = runPriorityAgent(urgentSuspiciousEmail, analysis).output;
    const security = runSecurityAgent(urgentSuspiciousEmail).output;
    const result = runSmartReplyAgent(urgentSuspiciousEmail, analysis, priority, security);

    expect(result.status).toBe("ok");
    expect(result.output.draft).toContain("official account portal");
    expect(result.output.confidence).toBeGreaterThan(0.5);
  });
});
