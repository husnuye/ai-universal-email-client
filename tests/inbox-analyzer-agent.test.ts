import { describe, expect, it } from "vitest";
import { runInboxAnalyzerAgent } from "../lib/agents/inbox-analyzer-agent";
import { urgentSuspiciousEmail } from "./agent-fixtures";

describe("Inbox Analyzer Agent", () => {
  it("returns structured analysis without throwing", () => {
    const result = runInboxAnalyzerAgent(urgentSuspiciousEmail);

    expect(result.status).toBe("ok");
    expect(result.output.category).toBe("security");
    expect(result.output.intent).toBe("request");
    expect(result.output.summary).toContain("payment");
    expect(result.output.detectedSignals).toContain("security-review");
  });
});
