"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

const _metadata: Metadata = {
  title: "RAG - Next - Cosmos DB - Vercel Example",
  description: "RAG - Next - Cosmos DB - Vercel Example",
};

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode;
  session: Session
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>;
      </body>
    </html>
  );
}
