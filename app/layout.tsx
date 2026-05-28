import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/app/components/AppShell";

export const metadata: Metadata = {
  title: "SoW Generator",
  description: "Generate pre-populated statements of work from SharePoint project data.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
