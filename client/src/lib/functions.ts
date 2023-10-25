import { emailRegex, passwordRegex } from "./const";

export function isAnEmail(email: string) {
  return emailRegex.test(email);
}
export function isAnPassword(password: string) {
  return passwordRegex.test(password);
}
