import { customAlphabet } from "nanoid";

export const createSecureId = (): string => {
  return customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 10)();
};
