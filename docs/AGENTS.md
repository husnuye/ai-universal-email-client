# Agents, Skills, Hooks, Plugins

## Agents

### Inbox Analyzer Agent

Purpose: Understand the email at a glance.

Inputs:

- sender
- subject
- body
- timestamp
- provider
- labels

Outputs:

- category
- key points
- detected intent

### Priority Agent

Purpose: Decide what needs attention first.

Outputs:

- low / medium / high priority
- reply needed
- due/urgency signal

### Smart Reply Agent

Purpose: Generate a usable reply draft.

Outputs:

- concise reply draft
- optional tone variants

### Semantic Search Agent

Purpose: Let the user search by meaning, not only keywords.

Example queries:

- "urgent finance emails"
- "messages waiting for my reply"
- "travel receipts from last month"

### Security Signal Agent

Purpose: Add a lightweight safety layer.

Outputs:

- low / medium / high risk
- reason for risk

### Follow-Up Agent

Purpose: Detect conversations that need a next step.

Outputs:

- follow-up recommendation
- suggested next action

## Skills

- email triage
- summarization
- reply drafting
- natural language search
- provider normalization
- phishing signal detection

## Hooks

Potential hooks:

- on email selected: generate or load AI insight
- on search submitted: run semantic ranking
- on archive/delete: update local inbox state
- on reply clicked: prefill compose with draft
- on account switched: filter inbox by provider

## Plugins / Integrations

Planned provider integrations:

- Gmail API
- Microsoft Graph / Office 365
- Yahoo IMAP
- AOL IMAP

Planned AI integrations:

- Claude API
- OpenAI API

MVP note: Demo data may be used for delivery speed, but provider and AI boundaries should be clear in code and documentation.
