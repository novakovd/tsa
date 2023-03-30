import { Message } from "@prisma/client";
import { createSecureId } from "../creators/secrets";
import { getPrismaClient } from "../providers/container-service";

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

export const saveMessage = async (
  message: string,
  secureId: string
): Promise<Message> => {
  return getPrismaClient().message.create({
    data: {
      value: message,
      secureId: secureId,
    },
  });
};
