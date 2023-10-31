import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PageWrapper, MenuSelector, AuthorProfile } from "@/components/common";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "James Nextjs Blog",
  description: "Frontend engineer's journey to becoming a better developer,",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.css"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
