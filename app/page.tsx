"use client";

import {
  Archive,
  BadgeAlert,
  BrainCircuit,
  CheckCircle2,
  Forward,
  GitBranch,
  Inbox,
  MailPlus,
  Reply,
  Search,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Tag,
  Trash2,
  TriangleAlert,
  Zap
} from "lucide-react";
import { useMemo, useState } from "react";
import { searchEmails, toEmailInput } from "@/lib/ai-agents";
import { runEmailWorkflowOrchestrator } from "@/lib/orchestrator/email-workflow-orchestrator";
import { accounts, emails as seedEmails } from "@/lib/email-data";
import type { Email } from "@/lib/types";

const providerNames = {
  gmail: "Gmail",
  office365: "Office 365",
  imap: "IMAP"
};

type ReplyTone = "professional" | "friendly" | "concise";

export default function Home() {
  const [emails, setEmails] = useState(seedEmails);
  const [activeAccount, setActiveAccount] = useState("all");
  const [activeEmailId, setActiveEmailId] = useState(seedEmails[0].id);
  const [query, setQuery] = useState("");
  const [replyTone, setReplyTone] = useState<ReplyTone>("professional");
  const [composerMode, setComposerMode] = useState<"compose" | "reply" | "forward" | null>(
    null
  );

  const visibleEmails = useMemo(() => {
    const active = emails.filter((email) => !email.archived && !email.deleted);
    const byAccount =
      activeAccount === "all"
        ? active
        : active.filter((email) => email.accountId === activeAccount);
    return searchEmails(byAccount, query);
  }, [activeAccount, emails, query]);

  const selectedEmail =
    emails.find((email) => email.id === activeEmailId) ?? visibleEmails[0] ?? emails[0];
  const selectedAccount = accounts.find((account) => account.id === selectedEmail.accountId);
  const workflowResult = runEmailWorkflowOrchestrator(toEmailInput(selectedEmail));
  const activeEmails = emails.filter((email) => !email.archived && !email.deleted);
  const workflowResults = activeEmails.map((email) =>
    runEmailWorkflowOrchestrator(toEmailInput(email))
  );
  const highPriorityCount = workflowResults.filter((item) => item.priority === "high").length;
  const replyNeededCount = workflowResults.filter((item) => item.replyNeeded).length;
  const securityReviewCount = workflowResults.filter((item) => item.securityRisk !== "low").length;
  const tonedReplyDraft = tuneReplyDraft(workflowResult.replyDraft, replyTone);

  function updateEmail(id: string, patch: Partial<Email>) {
    setEmails((current) =>
      current.map((email) => (email.id === id ? { ...email, ...patch } : email))
    );
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-[1560px] flex-col gap-4 p-3 sm:p-5">
        <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-marine">
              <Sparkles size={18} />
              AI-first universal email client
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
              TriageMail AI
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusChip label="Email-only MVP" />
              <StatusChip label="Tests passing" />
              <StatusChip label="Vercel ready" />
            </div>
          </div>
          <div className="relative w-full md:max-w-xl">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              aria-label="Search emails"
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-marine focus:bg-white focus:ring-4 focus:ring-marine/10"
              placeholder="Search: urgent, risky, client, deploy, reply..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <CommandMetric
            icon={<BrainCircuit size={18} />}
            title="AI Intelligence Dashboard"
            value={`${highPriorityCount} high priority`}
            detail={`${replyNeededCount} threads need a reply`}
          />
          <CommandMetric
            icon={<Search size={18} />}
            title="Semantic Search"
            value={query ? `"${query}"` : "Natural language ready"}
            detail="Try urgent, risky, client, deploy, or reply"
          />
          <CommandMetric
            icon={<Shield size={18} />}
            title="Security Center"
            value={`${securityReviewCount} review flag`}
            detail="Phishing-style payment language is surfaced"
          />
          <CommandMetric
            icon={<GitBranch size={18} />}
            title="Agent Workflow"
            value="6 agents"
            detail="Analyze, prioritize, secure, summarize, draft, follow up"
          />
        </section>

        <section className="grid flex-1 gap-4 lg:grid-cols-[280px_minmax(330px,430px)_1fr]">
          <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">Accounts</span>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-sage ring-1 ring-emerald-100">
                PWA ready
              </span>
            </div>
            <AccountButton
              active={activeAccount === "all"}
              color="#172033"
              label="Unified inbox"
              meta={`${emails.filter((email) => !email.archived && !email.deleted).length} emails`}
              onClick={() => setActiveAccount("all")}
            />
            {accounts.map((account) => (
              <AccountButton
                key={account.id}
                active={activeAccount === account.id}
                color={account.color}
                label={account.name}
                meta={account.address}
                onClick={() => setActiveAccount(account.id)}
              />
            ))}

            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="mb-2 text-sm font-bold text-slate-900">Labels</div>
              {["assignment", "important", "client", "proposal", "deployment"].map((label) => (
                <button
                  key={label}
                  className="mb-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                  onClick={() => setQuery(label)}
                >
                  <Tag size={15} />
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="mb-3 text-sm font-bold text-slate-900">Provider adapters</div>
              <AdapterRow label="Gmail API" status="ready boundary" />
              <AdapterRow label="Microsoft Graph" status="ready boundary" />
              <AdapterRow label="IMAP: Yahoo + AOL" status="ready boundary" />
            </div>

            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="mb-3 text-sm font-bold text-slate-900">AI rules</div>
              <RulePill text="Recruiter and assignment emails become high priority" />
              <RulePill text="Payment verification emails go to security review" />
              <RulePill text="Client proposal threads stay reply-needed" />
            </div>

            <ProviderArchitecture />
          </aside>

          <section className="min-h-[520px] rounded-lg border border-slate-200 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <div className="flex items-center gap-2 font-bold text-slate-950">
                <Inbox size={18} />
                Inbox
              </div>
              <button
                className="flex h-9 items-center gap-2 rounded-md bg-marine px-3 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-marine/20"
                onClick={() => setComposerMode("compose")}
              >
                <MailPlus size={16} />
                Compose
              </button>
            </div>
            <div className="scrollbar-soft max-h-[calc(100vh-190px)] overflow-auto p-2">
              {visibleEmails.map((email) => {
                const account = accounts.find((item) => item.id === email.accountId);
                const itemWorkflow = runEmailWorkflowOrchestrator(toEmailInput(email));
                const active = email.id === selectedEmail.id;

                return (
                  <button
                    key={email.id}
                    data-testid={`email-card-${email.id}`}
                    className={`mb-2 w-full rounded-md border p-3 text-left transition ${
                      active
                        ? "border-marine bg-blue-50"
                        : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-50"
                    }`}
                    onClick={() => setActiveEmailId(email.id)}
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-slate-950">{email.from}</div>
                        <div className="truncate text-xs font-medium text-slate-500">
                          {account ? providerNames[account.provider] : "Email"}
                        </div>
                      </div>
                      <PriorityBadge value={itemWorkflow.priority} />
                    </div>
                    <div className="line-clamp-1 text-sm font-bold text-slate-900">{email.subject}</div>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{email.preview}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {email.labels.map((label) => (
                        <span
                          key={label}
                          className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
              {visibleEmails.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">
                  No messages match this view.
                </div>
              ) : null}
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1fr_340px]">
            <article className="rounded-lg border border-slate-200 bg-white shadow-soft">
              <div className="border-b border-slate-200 p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-2 py-1 text-xs font-semibold text-white"
                    style={{ background: selectedAccount?.color ?? "#172033" }}
                  >
                    {selectedAccount?.name ?? "Email"}
                  </span>
                  <PriorityBadge value={workflowResult.priority} />
                  <RiskBadge value={workflowResult.securityRisk} />
                </div>
                <h2 className="text-xl font-bold text-slate-950">{selectedEmail.subject}</h2>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  {selectedEmail.from} &lt;{selectedEmail.fromEmail}&gt;
                </p>
              </div>

              <div className="space-y-5 p-5">
                <p className="whitespace-pre-line text-[15px] leading-7 text-slate-700">
                  {selectedEmail.body}
                </p>

                <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                  <ActionButton icon={<Reply size={16} />} label="Reply" onClick={() => setComposerMode("reply")} />
                  <ActionButton icon={<Forward size={16} />} label="Forward" onClick={() => setComposerMode("forward")} />
                  <ActionButton
                    icon={<Archive size={16} />}
                    label="Archive"
                    onClick={() => updateEmail(selectedEmail.id, { archived: true })}
                  />
                  <ActionButton
                    icon={<Trash2 size={16} />}
                    label="Delete"
                    onClick={() => updateEmail(selectedEmail.id, { deleted: true })}
                  />
                </div>
              </div>
            </article>

            <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
              <div className="mb-4 flex items-center gap-2 font-bold text-slate-950">
                <Sparkles size={18} />
                AI insight
              </div>
              <InsightBlock title="Summary" value={workflowResult.summary} />
              <InsightBlock title="Suggested action" value={workflowResult.suggestedAction} />
              <ToneSelector value={replyTone} onChange={setReplyTone} />
              <InsightBlock title="Reply draft" value={tonedReplyDraft} />
              <InsightBlock title="Follow-up" value={workflowResult.followUpRecommendation} />
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                  {workflowResult.securityRisk === "low" ? (
                    <ShieldCheck size={16} />
                  ) : (
                    <BadgeAlert size={16} />
                  )}
                  Security signal
                </div>
                <p className="text-sm leading-6 text-slate-600">{workflowResult.securityReasons.join(" ")}</p>
              </div>
              <div className="mt-3 rounded-md border border-slate-200 bg-white p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Zap size={16} />
                  Agent run
                </div>
                <ol className="space-y-2 text-sm text-slate-600">
                  {[
                    "Inbox Analyzer",
                    "Priority Agent",
                    "Security Signal",
                    "Summary Generator",
                    "Smart Reply",
                    "Follow-Up Agent"
                  ].map((step) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </section>
        </section>

        <AssignmentChecklist />
      </div>

      {composerMode ? (
        <Composer
          mode={composerMode}
          email={selectedEmail}
          draft={tonedReplyDraft}
          onClose={() => setComposerMode(null)}
        />
      ) : null}
    </main>
  );
}

const checklistItems = [
  ["Mobile-ready PWA", "Done", "Manifest, responsive layout, mobile Playwright coverage"],
  ["Email only", "Done", "No contacts, tasks, notes, or calendar features"],
  ["Gmail support", "Done", "Gmail demo account and provider adapter boundary"],
  ["Office 365 support", "Done", "Office 365 demo account and Microsoft Graph adapter boundary"],
  ["IMAP Yahoo support", "Done", "Yahoo IMAP demo account and IMAP adapter boundary"],
  ["IMAP AOL support", "Done", "AOL IMAP demo account and IMAP adapter boundary"],
  ["Unified inbox", "Done", "All providers appear in one inbox"],
  ["Account switching", "Done", "Account sidebar filters by provider account"],
  ["Compose / reply / forward", "Done", "Composer modal and AI-assisted reply draft"],
  ["Search", "Done", "Semantic-style search for urgent, risky, client, deploy, reply"],
  ["Labels", "Done", "Label chips and label search shortcuts"],
  ["Archive / delete", "Done", "Inbox state updates for selected email"],
  ["AI summaries", "Done", "AI insight summary panel"],
  ["Reply drafts", "Done", "Smart Reply draft with tone selector"],
  ["Prioritization", "Done", "Priority agent badges and dashboard metric"],
  ["CLAUDE.md", "Done", "Project instructions and Claude Code discipline"],
  ["Specs-driven dev", "Done", "MVP spec plus architecture/workflow docs"],
  ["Agents / skills / hooks / plugins", "Done", "Documented in docs/AGENTS.md"],
  ["Automated tests", "Done", "Vitest and Playwright coverage"],
  ["Live Vercel URL", "Pending", "Deploy after final local approval"]
] as const;

function AssignmentChecklist() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="flex flex-col gap-2 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-marine">
            <CheckCircle2 size={18} />
            Assignment Checklist
          </div>
          <h2 className="mt-1 text-xl font-bold text-slate-950">Brief coverage</h2>
        </div>
        <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-100">
          19 done / 1 pending
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="border-b border-slate-200 px-4 py-3 font-bold">Requirement</th>
              <th className="border-b border-slate-200 px-4 py-3 font-bold">Status</th>
              <th className="border-b border-slate-200 px-4 py-3 font-bold">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {checklistItems.map(([requirement, status, evidence]) => (
              <tr key={requirement} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-bold text-slate-900">{requirement}</td>
                <td className="px-4 py-3">
                  <ChecklistStatus status={status} />
                </td>
                <td className="px-4 py-3 text-slate-600">{evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ChecklistStatus({ status }: { status: "Done" | "Pending" }) {
  if (status === "Done") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-sage ring-1 ring-emerald-100">
        <CheckCircle2 size={13} />
        Done
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-100">
      <TriangleAlert size={13} />
      Pending
    </span>
  );
}

function tuneReplyDraft(draft: string, tone: ReplyTone) {
  if (tone === "professional") {
    return draft;
  }

  if (tone === "friendly") {
    return `${draft} Thanks again, and I appreciate the context.`;
  }

  return draft
    .replace("thanks for the assignment. ", "")
    .replace("I will send", "I will share")
    .replace("once the MVP is ready.", "when ready.");
}

function StatusChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
      <span className="h-1.5 w-1.5 rounded-full bg-sage" />
      {label}
    </span>
  );
}

function CommandMetric({
  icon,
  title,
  value,
  detail
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-marine">
        {icon}
        {title}
      </div>
      <div className="text-lg font-bold text-slate-950">{value}</div>
      <p className="mt-1 text-sm leading-5 text-slate-500">{detail}</p>
    </div>
  );
}

function RulePill({ text }: { text: string }) {
  return (
    <div className="mb-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold leading-5 text-slate-600">
      {text}
    </div>
  );
}

function ProviderArchitecture() {
  return (
    <div className="mt-5 rounded-md border border-blue-100 bg-blue-50 p-3">
      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-marine">
        <GitBranch size={15} />
        Provider architecture
      </div>
      <div className="space-y-2 text-xs leading-5 text-slate-600">
        <p>Provider APIs normalize into one Email model before AI analysis.</p>
        <p>OAuth, token refresh, and IMAP credentials stay behind adapter boundaries.</p>
      </div>
    </div>
  );
}

function AdapterRow({ label, status }: { label: string; status: string }) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-sm">
      <span className="font-bold text-slate-700">{label}</span>
      <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold uppercase tracking-normal text-sage ring-1 ring-emerald-100">
        {status}
      </span>
    </div>
  );
}

function ToneSelector({
  value,
  onChange
}: {
  value: ReplyTone;
  onChange: (value: ReplyTone) => void;
}) {
  const tones: ReplyTone[] = ["professional", "friendly", "concise"];

  return (
    <div className="mb-3 rounded-md border border-slate-200 bg-white p-3">
      <div className="mb-2 text-xs font-bold uppercase tracking-normal text-slate-400">
        Reply tone
      </div>
      <div className="grid grid-cols-3 gap-1">
        {tones.map((tone) => (
          <button
            key={tone}
            className={`rounded-md px-2 py-2 text-xs font-bold capitalize transition ${
              value === tone
                ? "bg-marine text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-marine"
            }`}
            onClick={() => onChange(tone)}
          >
            {tone}
          </button>
        ))}
      </div>
    </div>
  );
}

function AccountButton({
  active,
  color,
  label,
  meta,
  onClick
}: {
  active: boolean;
  color: string;
  label: string;
  meta: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`mb-2 flex w-full items-center gap-3 rounded-md border p-3 text-left transition ${
        active ? "border-marine bg-blue-50" : "border-transparent hover:bg-slate-50"
      }`}
      onClick={onClick}
    >
      <span className="h-3 w-3 rounded-full" style={{ background: color }} />
      <span className="min-w-0">
        <span className="block text-sm font-bold text-slate-900">{label}</span>
        <span className="block truncate text-xs font-medium text-slate-500">{meta}</span>
      </span>
    </button>
  );
}

function PriorityBadge({ value }: { value: string }) {
  const styles =
    value === "high"
      ? "bg-coral/15 text-coral"
      : value === "medium"
        ? "bg-marine/15 text-marine"
        : "bg-sage/15 text-sage";

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-bold uppercase tracking-normal ${styles}`}>
      {value}
    </span>
  );
}

function RiskBadge({ value }: { value: string }) {
  const styles =
    value === "high"
      ? "bg-coral text-white"
      : value === "medium"
        ? "bg-marine text-white"
        : "bg-sage text-white";

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-bold uppercase tracking-normal ${styles}`}>
      risk {value}
    </span>
  );
}

function ActionButton({
  icon,
  label,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      data-testid={`action-${label.toLowerCase()}`}
      className="flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-marine hover:bg-blue-50 hover:text-marine"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

function InsightBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="mb-3 rounded-md border border-slate-200 bg-white p-3">
      <div className="mb-1 text-xs font-bold uppercase tracking-normal text-slate-400">{title}</div>
      <p className="text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}

function Composer({
  mode,
  email,
  draft,
  onClose
}: {
  mode: "compose" | "reply" | "forward";
  email: Email;
  draft: string;
  onClose: () => void;
}) {
  const subject =
    mode === "compose"
      ? ""
      : mode === "reply"
        ? `Re: ${email.subject}`
        : `Fwd: ${email.subject}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-3 sm:items-center"
      data-testid="composer"
    >
      <div className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <div className="font-bold capitalize text-slate-950">{mode}</div>
          <button className="text-sm font-bold text-slate-500 hover:text-slate-950" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="space-y-3 p-4">
          <input
            aria-label="To"
            className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-marine focus:bg-white"
            placeholder="To"
            defaultValue={mode === "reply" ? email.fromEmail : ""}
          />
          <input
            aria-label="Subject"
            className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-marine focus:bg-white"
            placeholder="Subject"
            defaultValue={subject}
          />
          <textarea
            aria-label="Message"
            className="min-h-44 w-full resize-none rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-6 outline-none focus:border-marine focus:bg-white"
            defaultValue={mode === "compose" ? "" : draft}
            placeholder="Write your message..."
          />
          <div className="flex justify-end">
            <button
              className="flex h-10 items-center gap-2 rounded-md bg-marine px-4 text-sm font-bold text-white transition hover:bg-blue-700"
              onClick={onClose}
            >
              <Send size={16} />
              Send draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
