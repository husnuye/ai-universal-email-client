# AI-First Universal Email Client

Mobile-ready PWA for a universal AI email inbox.

This project is built for the assignment: create an AI-first email-only client with unified inbox, provider support for Gmail / Office 365 / IMAP for Yahoo and AOL, compose/reply/forward, search, labels, archive/delete, AI summaries, reply drafts, and prioritization.

## Documents

- [CLAUDE.md](./CLAUDE.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Workflow](./docs/WORKFLOW.md)
- [Agents](./docs/AGENTS.md)
- [MVP Spec](./specs/MVP_SPEC.md)

## Run Locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Verification

```bash
npm run build
npm test
npm run test:e2e
```

Current coverage:

- AI priority, summary, search, and security signal unit tests
- desktop and mobile Playwright smoke tests
- inbox render, semantic search, and AI reply workflow

## MVP Feature Set

- Unified inbox for Gmail, Office 365, Yahoo IMAP, and AOL IMAP demo accounts
- Provider adapter boundaries for future real API integrations
- AI Intelligence Dashboard with priority and reply-needed signals
- Semantic Search interface for natural-language email lookup
- Security Center signal for suspicious payment/verification language
- Agent workflow panel showing analyzer, priority, security, summary, reply, and follow-up steps
- AI Rules showing how user-specific inbox instructions would guide prioritization
- Reply tone selector for professional, friendly, and concise AI drafts
- Provider architecture note explaining where Gmail, Microsoft Graph, Yahoo IMAP, and AOL IMAP integrations attach
