import { customAlphabet } from "nanoid";

export const generateSecureId = (): string => {
  return customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    5
  )();
};
