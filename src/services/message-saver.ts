import { getPrismaClient } from "./prisma-client-provider";
import { generateSecureId } from "./secure-id-provider";

interface Message {
  readonly id: number;
  readonly secureId: string;
  readonly value: string;
  readonly timeCreated: Date;
}

export const saveMessage = async (message: string): Promise<Message> => {
  const prismaClient = getPrismaClient();

  const result = await prismaClient.message.create({
    data: {
      strValue: message,
      strSecureId: generateSecureId(),
    },
  });

  return {
    id: result.intMessageId,
    secureId: result.strSecureId,
    value: result.strValue,
    timeCreated: result.dtmCreated,
  };
};
