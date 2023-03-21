import { getPrismaClient } from "../get-prisma-client";
import { Message } from "@prisma/client";
export const findMessage = async (
  secureId: string
): Promise<Message | null> => {
  return getPrismaClient().message.findUnique({
    where: {
      secureId: secureId,
    },
  });
};
