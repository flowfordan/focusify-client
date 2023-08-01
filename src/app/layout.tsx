import "../styles/index.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Focusify",
  description: "Focus away",
  applicationName: "Focusify",
  authors: {
    name: "Daniil Rychkov (flowfordan)",
    url: "flowfordan.kitezh.xyz",
  },
  keywords: [
    "focus",
    "focusify",
    "concentration",
    "flow",
    "focus away",
    "focusify app",
  ],
  referrer: "origin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
