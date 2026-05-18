import { accounts, emails } from "./email-data";
import type { Account, Email, Provider } from "./types";

export type ProviderAdapter = {
  id: Provider;
  name: string;
  supportedAccounts: string[];
  fetchInbox: () => Email[];
};

function emailsFor(accountIds: string[]) {
  return emails.filter((email) => accountIds.includes(email.accountId));
}

export const providerAdapters: ProviderAdapter[] = [
  {
    id: "gmail",
    name: "Gmail API",
    supportedAccounts: ["acc-gmail"],
    fetchInbox: () => emailsFor(["acc-gmail"])
  },
  {
    id: "office365",
    name: "Microsoft Graph / Office 365",
    supportedAccounts: ["acc-office"],
    fetchInbox: () => emailsFor(["acc-office"])
  },
  {
    id: "imap",
    name: "IMAP for Yahoo and AOL",
    supportedAccounts: ["acc-yahoo", "acc-aol"],
    fetchInbox: () => emailsFor(["acc-yahoo", "acc-aol"])
  }
];

export function getAccountsForProvider(provider: Provider): Account[] {
  return accounts.filter((account) => account.provider === provider);
}

