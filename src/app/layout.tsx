import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Islamic Legal Information System",
  description:
    "A comparative Islamic legal information system presenting selected opinions from the four Sunni schools of thought.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}