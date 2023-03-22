import { getPrismaClient } from "../get-prisma-client";
import { Message } from "@prisma/client";

export const removeMessage = async (
  secureId: string
): Promise<Message | null> => {
  return getPrismaClient().message.delete({
    where: {
      secureId: secureId,
    },
  });
};
