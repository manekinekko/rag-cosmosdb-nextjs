"use client";

import { signIn } from "next-auth/react";
import styles from "./page.module.css";

export default function SignInButton() {
  return (
    <button
      className={styles.button}
      onClick={() => signIn("github", { callbackUrl: "/" })}
      type="button"
    >
      Sign In
    </button>
  );
}
