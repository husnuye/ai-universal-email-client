import type { AgentExecution, EmailInput } from "./types";

const semanticGroups: Record<string, string[]> = {
  urgent: ["high", "deadline", "today", "monday", "action"],
  risky: ["payment", "verify", "phishing", "security", "card"],
  client: ["proposal", "leadership", "review", "call"],
  deploy: ["vercel", "deployment", "preview", "build"],
  reply: ["draft", "response", "send", "question", "follow"],
  imap: ["imap", "yahoo", "aol"],
  yahoo: ["yahoo", "imap"],
  aol: ["aol", "imap"]
};

export type SemanticSearchResult = {
  matches: EmailInput[];
  query: string;
};

export function runSemanticSearchAgent(
  emails: EmailInput[],
  query: string,
  getSearchText: (email: EmailInput) => string
): AgentExecution<SemanticSearchResult> {
  try {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return {
        status: "ok",
        note: "Empty search query returned all visible emails.",
        output: { matches: emails, query }
      };
    }

    const words = normalized.split(/\s+/).filter(Boolean);
    const matches = emails.filter((email) => {
      const haystack = getSearchText(email).toLowerCase();
      return words.every((word) => haystack.includes(word) || semanticMatch(word, haystack));
    });

    return {
      status: "ok",
      note: "Semantic search completed using deterministic synonym groups.",
      output: { matches, query }
    };
  } catch {
    return {
      status: "fallback",
      note: "Search fallback used.",
      output: {
        matches: emails,
        query
      }
    };
  }
}

function semanticMatch(word: string, haystack: string) {
  return semanticGroups[word]?.some((term) => haystack.includes(term)) ?? false;
}

