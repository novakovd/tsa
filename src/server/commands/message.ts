import { Message } from "@prisma/client";
import { MessagePayload, SecureIdPayload } from "../../shared/types/payload";
import {
  findMessage,
  removeMessage,
  saveMessage,
} from "../repositories/message";
import { createSecureId } from "../creators/secrets";
import {
  HTTPNotFoundError,
  UnableToGenerateSecureIdError,
} from "../types/error";
import {
  validateMessagePayload,
  validateSecureIdPayload,
} from "../validators/payload";

export const saveMessageCommand = async (
  messagePayload: MessagePayload
): Promise<Message> => {
  const message = validateMessagePayload(messagePayload).message;
  const maxIterations = 2;

  for (let i = 0; i < maxIterations; i++) {
    const secureId = createSecureId();

    if (null == (await findMessage(secureId))) {
      return saveMessage(message, secureId);
    }
  }

  throw new UnableToGenerateSecureIdError();
};

export const revealMessageCommand = async (
  secureIdPayload: SecureIdPayload
): Promise<Message> => {
  const secureId = validateSecureIdPayload(secureIdPayload).secureId;
  const message = await findMessage(secureId);

  if (null === message) throw new HTTPNotFoundError("Message not found");

  await removeMessage(secureId);

  return message;
};
