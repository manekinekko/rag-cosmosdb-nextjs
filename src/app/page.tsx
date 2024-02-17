"use client";

import { redirect } from 'next/navigation';
import { rand } from './_utils';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/403';

export default function Home() {
  const { data: session, status } = useSession();
  console.log({session, status});

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'authenticated') {
    redirect(`/${session.user?.email}/${rand()}`);
  }
  // if (status === 'unauthenticated') return <AccessDenied />;
  
}
