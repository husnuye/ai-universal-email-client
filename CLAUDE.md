# CLAUDE.md

## Project

AI-first universal email client delivered as a mobile-ready PWA.

The assignment is to build an email-only client that supports Gmail, Office 365, and IMAP for Yahoo and AOL through a unified inbox, account switching, compose/reply/forward, search, labels, archive/delete, AI summaries, reply drafts, and prioritization.

This project should stay focused on the assignment. Do not add contacts, tasks, notes, or calendar features.

## Product Principle

The product should feel like an inbox that thinks with the user:

- summarize the message
- identify priority
- suggest the next action
- draft a reply
- flag obvious security risk

Security is a supporting signal, not the main product.

## Agent OS Methodology

Build through small, spec-driven slices:

1. Define the product requirement in docs/specs.
2. Implement one bounded agent or UI workflow.
3. Keep the agent contract typed and JSON-compatible.
4. Add deterministic fallback behavior before any external AI dependency.
5. Add or update tests.
6. Verify with lint, typecheck, tests, and build.

## Delivery Strategy

Build a polished MVP with provider-ready architecture.

The demo can use seeded email data, but the code must include clear provider boundaries for:

- Gmail
- Office 365
- Yahoo IMAP
- AOL IMAP

This keeps the project realistic without spending the whole timeline on OAuth and provider setup.

## Agent Workflow

The production-style pipeline lives in `lib/orchestrator/email-workflow-orchestrator.ts`:

```text
Incoming Email
  -> Inbox Analyzer Agent
  -> Priority Agent
  -> Security Agent
  -> Smart Reply Agent
  -> Follow-Up Agent
  -> Final AI Email Intelligence Result
```

Agents live in `lib/agents/*` and use shared types from `lib/agents/types.ts`.

## AI Provider Rule

Do not require paid AI APIs for the demo path. Keep deterministic logic as the default. Future Claude/OpenAI calls should be introduced behind the agent modules without changing UI behavior.

## Implementation Rules

- Keep the first screen as the actual email client, not a marketing landing page.
- Prioritize mobile-ready responsive layout.
- Keep all core assignment features visible and testable.
- Prefer clean architecture over overbuilt integrations.
- Keep AI behavior deterministic enough for demo and tests.
- Add tests for core workflows before delivery.

## Expected Deliverables

- Live Vercel URL
- `CLAUDE.md`
- one-page architecture document
- agents/skills/hooks/plugins list
- short workflow writeup
- automated tests
- polished PWA demo
