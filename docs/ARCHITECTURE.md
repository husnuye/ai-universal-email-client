# Architecture

## One-Line Summary

An AI-first universal email client that presents Gmail, Office 365, Yahoo IMAP, and AOL IMAP messages in one inbox, then uses a modular agent workflow to analyze, prioritize, secure, search, and draft replies.

## Product Scope

In scope:

- mobile-ready PWA
- email only
- unified inbox
- account switching
- compose, reply, forward
- search
- labels
- archive and delete
- AI summary
- AI reply draft
- AI prioritization
- small security risk signal

Out of scope:

- contacts
- tasks
- notes
- calendar
- full provider OAuth production approval in the demo path

## High-Level System

```text
User Interface
  |
  v
Email Application Layer
  |
  +--> Provider Layer
  |      +--> Gmail adapter boundary
  |      +--> Microsoft Graph / Office 365 adapter boundary
  |      +--> IMAP adapter boundary for Yahoo and AOL
  |
  +--> Email Workflow Orchestrator
  |      +--> Inbox Analyzer Agent
  |      +--> Priority Agent
  |      +--> Security Agent
  |      +--> Smart Reply Agent
  |      +--> Follow-Up Agent
  |
  +--> Semantic Search Agent
  |
  v
Data Layer
  +--> accounts
  +--> emails
  +--> labels
  +--> AI insight results
```

## Agent Layer

The agent layer is intentionally modular:

- shared schemas: `lib/agents/types.ts`
- orchestrator: `lib/orchestrator/email-workflow-orchestrator.ts`
- individual agents: `lib/agents/*`

Each agent returns structured JSON-compatible data and catches unexpected failures with deterministic fallback behavior. This makes the demo reliable while leaving a clear insertion point for future Claude/OpenAI calls.

## Provider Layer

The provider layer normalizes different providers into one internal email shape.

```text
Gmail message
Office 365 message
Yahoo/AOL IMAP message
      |
      v
EmailInput
      |
      v
Email Workflow Orchestrator
```

For the MVP, provider adapters read seeded/demo messages. In production, OAuth token refresh, Microsoft Graph, Gmail API, and IMAP credentials would stay behind this boundary.

## Frontend

Stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- mobile-ready PWA metadata

Primary screens and panels:

- Unified Inbox
- Email Detail
- Compose / Reply / Forward
- AI Insight Panel
- Semantic Search
- Security Center light view
- AI Workspace Capabilities

## Testing

Coverage includes:

- independent agent unit tests
- orchestrator integration-style test
- compatibility tests for the UI-facing AI helpers
- Playwright desktop/mobile smoke tests

## Deployment

Target:

- Vercel
- environment variables prepared in `.env.example`
- no paid AI API required for the demo path
