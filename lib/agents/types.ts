import type { Priority, Provider, SecurityRisk } from "../types";

export type EmailInput = {
  id: string;
  accountId: string;
  provider?: Provider;
  from: string;
  fromEmail: string;
  subject: string;
  preview?: string;
  body: string;
  receivedAt?: string;
  labels?: string[];
};

export type InboxAnalysisResult = {
  summary: string;
  category: string;
  intent: string;
  keyPoints: string[];
  detectedSignals: string[];
};

export type PriorityResult = {
  priority: Priority;
  score: number;
  replyNeeded: boolean;
  urgencyReason: string;
};

export type SecurityResult = {
  risk: SecurityRisk;
  score: number;
  warning: boolean;
  reasons: string[];
};

export type SmartReplyResult = {
  draft: string;
  tone: "professional";
  confidence: number;
};

export type FollowUpResult = {
  needed: boolean;
  recommendation: string;
  suggestedAction: string;
};

export type EmailWorkflowResult = {
  emailId: string;
  summary: string;
  category: string;
  intent: string;
  keyPoints: string[];
  detectedSignals: string[];
  priority: Priority;
  priorityScore: number;
  replyNeeded: boolean;
  urgencyReason: string;
  securityRisk: SecurityRisk;
  securityScore: number;
  securityWarning: boolean;
  securityReasons: string[];
  replyDraft: string;
  followUpNeeded: boolean;
  followUpRecommendation: string;
  suggestedAction: string;
  agentTrace: Array<{
    agent: string;
    status: "ok" | "fallback";
    note: string;
  }>;
};

export type AgentExecution<T> = {
  output: T;
  status: "ok" | "fallback";
  note: string;
};

