export type Provider = "gmail" | "office365" | "imap";

export type Priority = "low" | "medium" | "high";

export type SecurityRisk = "low" | "medium" | "high";

export type Account = {
  id: string;
  provider: Provider;
  name: string;
  address: string;
  color: string;
};

export type Email = {
  id: string;
  accountId: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: string;
  labels: string[];
  unread: boolean;
  archived: boolean;
  deleted: boolean;
};

export type AIInsight = {
  summary: string;
  priority: Priority;
  replyNeeded: boolean;
  securityRisk: SecurityRisk;
  securityReason: string;
  suggestedAction: string;
  replyDraft: string;
  followUp: string;
};

