"use client";

import { signOut } from "next-auth/react";
import styles from "./page.module.css";

export default function SignOutButton() {
  return (
    <button
      className={styles.button}
      onClick={() => signOut({ callbackUrl: "/", redirect: true })}
      type="button"
    >
      Sign Out
    </button>
  );
}
