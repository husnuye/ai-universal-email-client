# Workflow

## Assignment Workflow

```text
Open app
  |
  v
Select account or unified inbox
  |
  v
Read email list
  |
  v
Open email
  |
  v
AI agents generate:
  - summary
  - priority
  - suggested action
  - reply draft
  - security signal
  |
  v
User archives, deletes, labels, replies, forwards, or searches
```

## Incoming Email Workflow

```text
Provider adapter receives message
  |
  v
Normalize message shape
  |
  v
Inbox Analyzer Agent
  |
  v
Priority Agent
  |
  v
Security Signal Agent
  |
  v
Smart Reply Agent
  |
  v
Render email with AI insights
```

## Demo Workflow

The MVP should show a realistic user journey:

1. User opens the unified inbox.
2. User switches between Gmail, Office 365, Yahoo IMAP, AOL IMAP, and all accounts.
3. User opens an email.
4. AI summary, priority, reply draft, and security signal are visible.
5. User searches with natural language.
6. User labels, archives, deletes, replies, or forwards a message.
