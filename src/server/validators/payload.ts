import Joi from "joi";
import { MessagePayload, SecureIdPayload } from "../../shared/types/payload";
import { getConfig } from "../providers/container-service";

export const validateMessage = (payload: MessagePayload): MessagePayload => {
  const validationResult = Joi.object({
    message: Joi.string()
      .min(1)
      .max(Number(getConfig().maxTextLength))
      .required(),
  }).validate(payload);

  if (validationResult.error) throw validationResult.error;

  return validationResult.value;
};

export const validateSecureId = (payload: SecureIdPayload): SecureIdPayload => {
  const validationResult = Joi.object({
    secureId: Joi.string().required(),
  }).validate(payload);

  if (validationResult.error) throw validationResult.error;

  return validationResult.value;
};
