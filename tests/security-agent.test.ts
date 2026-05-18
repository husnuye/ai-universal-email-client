import { describe, expect, it } from "vitest";
import { runSecurityAgent } from "../lib/agents/security-agent";
import { urgentSuspiciousEmail } from "./agent-fixtures";

describe("Security Agent", () => {
  it("flags phishing-style payment verification language", () => {
    const result = runSecurityAgent(urgentSuspiciousEmail);

    expect(result.status).toBe("ok");
    expect(result.output.risk).toBe("high");
    expect(result.output.warning).toBe(true);
    expect(result.output.reasons.join(" ")).toContain("payment method");
  });
});
