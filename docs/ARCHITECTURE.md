# Architecture

## One-Line Summary

An AI-first universal email client that presents Gmail, Office 365, Yahoo IMAP, and AOL IMAP messages in one inbox, then uses agent workflows to summarize, prioritize, search, and draft replies.

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
- full provider OAuth production approval

## High-Level System

```text
User Interface
  |
  v
Email Application Layer
  |
  +--> Provider Layer
  |      +--> Gmail adapter
  |      +--> Office 365 adapter
  |      +--> IMAP adapter for Yahoo and AOL
  |
  +--> AI Agent Layer
  |      +--> Inbox Analyzer Agent
  |      +--> Priority Agent
  |      +--> Smart Reply Agent
  |      +--> Semantic Search Agent
  |      +--> Security Signal Agent
  |      +--> Follow-Up Agent
  |
  v
Data Layer
  +--> accounts
  +--> emails
  +--> threads
  +--> labels
  +--> AI insights
```

## Frontend

Recommended stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- local state for demo workflows

Primary screens:

- Unified Inbox
- Email Detail
- Compose / Reply / Forward
- AI Insight Panel
- Search Results
- Security Center light view

The first screen should be the working inbox, not a landing page.

## Provider Layer

The provider layer normalizes different email providers into one internal email shape.

```text
Gmail message
Office 365 message
Yahoo/AOL IMAP message
      |
      v
Normalized Email
```

For the MVP, provider adapters can read seeded/demo messages. The adapter boundary should make it clear where real OAuth/API integrations would be added.

## AI Layer

The AI layer receives normalized email data and returns structured insights.

Example output:

```json
{
  "summary": "Client is asking for a revised proposal by tomorrow.",
  "priority": "high",
  "replyNeeded": true,
  "securityRisk": "low",
  "suggestedAction": "Send revised proposal and confirm timeline.",
  "replyDraft": "Hi, thanks for the update. I can send the revised proposal by tomorrow..."
}
```

For demo stability, AI outputs can be deterministic fixtures or rule-based functions. The architecture should still describe where Claude/OpenAI calls would run in production.

## Data Model

Core entities:

- Account
- Email
- Thread
- Label
- Attachment metadata
- AIInsight

The MVP can store data in local fixtures or a lightweight local data module. Production-ready notes can reference PostgreSQL/Prisma.

## Testing

Minimum tests:

- inbox renders messages from multiple accounts
- account switching filters correctly
- search returns relevant emails
- archive/delete updates inbox state
- reply draft appears for selected email
- priority/security labels render

## Deployment

Target:

- Vercel
- environment variables prepared for future provider/API keys
- PWA metadata and responsive behavior
