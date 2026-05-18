import { describe, expect, it } from "vitest";
import { analyzeEmail, searchEmails } from "../lib/ai-agents";
import { emails } from "../lib/email-data";

describe("AI email agents", () => {
  it("prioritizes the assignment email as high priority", () => {
    const insight = analyzeEmail(emails[0]);

    expect(insight.priority).toBe("high");
    expect(insight.replyNeeded).toBe(true);
    expect(insight.summary).toContain("mobile-ready AI email client");
  });

  it("flags suspicious payment verification language", () => {
    const insight = analyzeEmail(emails[2]);

    expect(insight.securityRisk).toBe("high");
    expect(insight.securityReason).toContain("payment");
  });

  it("supports semantic search for risky emails", () => {
    const results = searchEmails(emails, "risky");

    expect(results.map((email) => email.id)).toContain("mail-3");
  });

  it("supports semantic search for deployment messages", () => {
    const results = searchEmails(emails, "deploy");

    expect(results.map((email) => email.subject)).toContain("Deployment preview ready");
  });
});

