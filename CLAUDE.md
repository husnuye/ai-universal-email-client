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

## Delivery Strategy

Build a polished MVP with provider-ready architecture.

The demo can use seeded email data, but the code should include clear provider boundaries for:

- Gmail
- Office 365
- Yahoo IMAP
- AOL IMAP

This keeps the project realistic without spending the whole timeline on OAuth and provider setup.

## Agent Workflow

Use the following agents as product and code boundaries:

1. Inbox Analyzer Agent
   - reads email metadata and content
   - classifies category and intent
   - extracts useful signals

2. Priority Agent
   - assigns priority score
   - identifies urgency
   - detects whether a reply is needed

3. Smart Reply Agent
   - drafts replies
   - adapts tone
   - supports reply and forward workflows

4. Semantic Search Agent
   - handles natural-language search
   - ranks relevant email threads

5. Security Signal Agent
   - flags suspicious senders, links, and wording
   - produces a simple risk label

6. Follow-Up Agent
   - identifies unanswered conversations
   - recommends follow-up actions

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
