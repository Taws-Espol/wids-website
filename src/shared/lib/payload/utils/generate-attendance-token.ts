import { randomBytes } from "node:crypto";

export function generateAttendanceToken(): string {
  return randomBytes(24).toString("base64url");
}
