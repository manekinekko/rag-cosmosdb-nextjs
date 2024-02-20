import { createHash } from "crypto";

export function rand() {
  return (Math.random() + 1).toString(36).substring(2);
}

export const hash = (str: string) => createHash("md5").update(str).digest("hex");
