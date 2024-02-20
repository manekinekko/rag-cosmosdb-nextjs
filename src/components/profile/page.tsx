"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const { data: session, status } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <a href={"/"}>
      <Image
        priority
        src={session?.user?.image || "/users/wassimchegham.jpeg"}
        width="56"
        height="56"
        alt=""
      />
    </a>
  );
}
