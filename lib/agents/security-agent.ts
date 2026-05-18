import type { AgentExecution, EmailInput, SecurityResult } from "./types";
import { normalizeEmailText } from "./inbox-analyzer-agent";

const riskyTerms = ["verify", "card details", "payment method", "limited", "click", "password"];

export function runSecurityAgent(email: EmailInput): AgentExecution<SecurityResult> {
  try {
    const text = normalizeEmailText(email);
    const reasons = riskyTerms.filter((term) => text.includes(term));
    const suspiciousSender =
      email.fromEmail.includes("secure.example") || email.fromEmail.includes("billing-alert");
    const score = Math.min(100, reasons.length * 22 + (suspiciousSender ? 18 : 0));
    const risk = score >= 65 ? "high" : score >= 25 ? "medium" : "low";

    return {
      status: "ok",
      note: "Security risk generated from sender and phishing-style language.",
      output: {
        risk,
        score,
        warning: risk !== "low",
        reasons:
          risk === "low"
            ? ["No obvious phishing signals detected."]
            : [
                ...reasons.map((reason) => `Contains "${reason}" language.`),
                ...(suspiciousSender ? ["Sender domain looks like a security-themed alias."] : [])
              ]
      }
    };
  } catch {
    return {
      status: "fallback",
      note: "Security fallback used.",
      output: {
        risk: "medium",
        score: 45,
        warning: true,
        reasons: ["Security analysis failed, so manual review is recommended."]
      }
    };
  }
}

