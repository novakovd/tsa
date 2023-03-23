import Joi from "joi";
import { MessagePayload } from "../../../shared/types/payload";

export const validateMessage = (payload: MessagePayload): MessagePayload => {
  const validationResult = Joi.object({
    message: Joi.string().min(1).max(500).required(),
  }).validate(payload);

  if (validationResult.error) throw validationResult.error;

  return validationResult.value;
};
