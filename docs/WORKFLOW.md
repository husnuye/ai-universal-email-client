# Workflow

## User Workflow

```text
Open app
  -> Select unified inbox or an account
  -> Read email list
  -> Open email
  -> Review AI insight
  -> Search, label, archive, delete, reply, forward, or compose
```

## Agentic Email Workflow

```text
Provider adapter receives message
  -> Normalize to EmailInput
  -> Inbox Analyzer Agent
  -> Priority Agent
  -> Security Agent
  -> Smart Reply Agent
  -> Follow-Up Agent
  -> Final AI Email Intelligence Result
  -> Render insight in the UI
```

## Live Ask AI Workflow

```text
User asks a question about selected thread
  -> Simulated agent trace appears step by step
  -> Existing orchestrator result is reused
  -> Ask AI Agent returns deterministic answer
```

The Ask AI panel supports summary, reply draft, security, follow-up, and general next-action questions. The trace is simulated for demo clarity, while the answer is grounded in the selected email and orchestrator output.

## Deterministic Fallback Workflow

The demo does not require real Claude/OpenAI calls. Each agent uses deterministic logic by default and returns a fallback response if analysis fails. Future LLM calls can be plugged into each agent while preserving the same typed output contract.

## Demo Workflow

1. User opens the unified inbox.
2. User switches between Gmail, Office 365, Yahoo IMAP, AOL IMAP, and all accounts.
3. User opens an email.
4. AI summary, priority, reply draft, follow-up, and security signal are visible.
5. User searches with natural language.
6. User labels, archives, deletes, replies, or forwards a message.
7. The checklist shows assignment coverage and the remaining deployment step.
