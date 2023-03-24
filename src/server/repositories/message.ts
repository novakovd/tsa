import { Message, PrismaClient } from "@prisma/client";
import { generateSecureId } from "../utils/get-secure-id";
import { getPrismaClient } from "../utils/container";

export const findMessage = async (
  secureId: string
): Promise<Message | null> => {
  return getPrismaClient().message.findUnique({
    where: {
      secureId: secureId,
    },
  });
};

export const removeMessage = async (
  secureId: string
): Promise<Message | null> => {
  return getPrismaClient().message.delete({
    where: {
      secureId: secureId,
    },
  });
};

export const saveMessage = async (message: string): Promise<Message> => {
  return getPrismaClient().message.create({
    data: {
      value: message,
      secureId: generateSecureId(),
    },
  });
};
