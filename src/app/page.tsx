"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { hash, rand } from "./_utils";


export default function Home() {
  const { data: session, status } = useSession();
  console.log({ session, status });

  if (status === "loading") return <main>Loading...</main>;
  if (status === "authenticated") {
    redirect(`/${hash(session.user?.email as string)}/${rand()}`);
  }
  // if (status === 'unauthenticated') return <AccessDenied />;
}
