import { expect, test } from "@playwright/test";

test("unified inbox shows AI email workflow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "TriageMail AI" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Unified inbox/ })).toBeVisible();
  await expect(page.getByText("AI-first email client assignment").first()).toBeVisible();
  await expect(page.getByText("AI insight", { exact: true })).toBeVisible();
  await expect(page.getByText("Reply draft", { exact: true })).toBeVisible();
});

test("semantic search can find risky messages", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(750);

  await page.getByLabel("Search emails").fill("risky");

  await expect(page.getByText("Action required: verify payment method")).toBeVisible();
  await page.getByTestId("email-card-mail-3").click();
  await expect(page.getByRole("heading", { name: "Action required: verify payment method" })).toBeVisible();
  await expect(page.getByText("Do not click")).toBeVisible();
});

test("reply workflow opens composer with AI draft", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(750);

  await page.getByTestId("action-reply").click();

  await expect(page.getByTestId("composer")).toBeVisible();
  await expect(page.getByLabel("Subject")).toHaveValue("Re: AI-first email client assignment");
  await expect(page.getByLabel("Message")).toHaveValue(/Hi Taj/);
});
