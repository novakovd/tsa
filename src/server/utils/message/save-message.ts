import { getPrismaClient } from "../get-prisma-client";
import { generateSecureId } from "../get-secure-id";
import { Message } from "@prisma/client";

export const saveMessage = async (message: string): Promise<Message> => {
  return getPrismaClient().message.create({
    data: {
      value: message,
      secureId: generateSecureId(),
    },
  });
};
