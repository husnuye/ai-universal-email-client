# Agents, Skills, Hooks, Plugins

## Agents

All agent schemas are defined in `lib/agents/types.ts`. The pipeline is coordinated by `lib/orchestrator/email-workflow-orchestrator.ts`.

### Inbox Analyzer Agent

File: `lib/agents/inbox-analyzer-agent.ts`

Purpose: Understand the email at a glance.

Inputs:

- `EmailInput`

Outputs:

- `InboxAnalysisResult`
- summary
- category
- intent
- key points
- detected signals

### Priority Agent

File: `lib/agents/priority-agent.ts`

Purpose: Decide what needs attention first.

Outputs:

- `PriorityResult`
- low / medium / high priority
- numeric score
- reply-needed flag
- urgency reason

### Security Agent

File: `lib/agents/security-agent.ts`

Purpose: Add a lightweight safety layer for suspicious sender and phishing-style wording.

Outputs:

- `SecurityResult`
- low / medium / high risk
- warning flag
- reasons

### Smart Reply Agent

File: `lib/agents/smart-reply-agent.ts`

Purpose: Generate a usable reply draft while respecting security and priority context.

Outputs:

- `SmartReplyResult`
- reply draft
- tone
- confidence

### Follow-Up Agent

File: `lib/agents/follow-up-agent.ts`

Purpose: Detect conversations that need a next step.

Outputs:

- `FollowUpResult`
- follow-up recommendation
- suggested next action

### Semantic Search Agent

File: `lib/agents/semantic-search-agent.ts`

Purpose: Let the user search by meaning, not only keywords.

Example queries:

- "urgent finance emails"
- "messages waiting for my reply"
- "travel receipts from last month"
- "risky payment verification"

## Skills

- email triage
- summarization
- reply drafting
- natural-language search
- provider normalization
- phishing signal detection
- follow-up recommendation

## Hooks

Potential hooks:

- on email selected: run or load orchestrated AI insight
- on search submitted: run Semantic Search Agent
- on archive/delete: update local inbox state
- on reply clicked: prefill composer with Smart Reply Agent output
- on account switched: filter inbox by provider account
- on provider sync: normalize messages into `EmailInput`

## Plugins / Integrations

Planned provider integrations:

- Gmail API
- Microsoft Graph / Office 365
- Yahoo IMAP
- AOL IMAP

Planned AI integrations:

- Claude API
- OpenAI API

Demo note: deterministic fallback is used for reliability. Real LLM calls can be added inside each agent without changing UI contracts.
