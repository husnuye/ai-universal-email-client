import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TriageMail AI",
  description: "AI-first universal email client for Gmail, Office 365, and IMAP.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "TriageMail AI",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#f7f5ef",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

