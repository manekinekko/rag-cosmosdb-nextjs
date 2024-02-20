"use client";

import { signIn } from "next-auth/react";

import styles from "./page.module.css";
import Image from "next/image";

export default function SignInPage() {
  return (
    <main className={styles.main}>
      <button
        className={styles.button}
        onClick={() => signIn("github", { callbackUrl: "/" })}
        type="button"
      >
          <Image src="/gh.png" alt="GitHub Logo" width="32" height="32" className={styles.logo}/>
          <span>Sign In With GitHub</span>  
      </button>
    </main>
  );
}