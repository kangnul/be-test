import { createHash } from "crypto";

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function comparePassword(raw: string, hashed: string): boolean {
  return hashPassword(raw) === hashed;
}