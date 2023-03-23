import Joi from "joi";
import { SecureIdPayload } from "../../shared/types/payload";

export const validateSecureid = (payload: SecureIdPayload): SecureIdPayload => {
  const validationResult = Joi.object({
    secureId: Joi.string().required(),
  }).validate(payload);

  if (validationResult.error) throw validationResult.error;

  return validationResult.value;
};
