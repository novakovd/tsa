import Joi from "joi";

export interface MessagePayload {
  message: string;
}

export const validateMessage = (value: string): MessagePayload => {
  const validationResult = Joi.object({
    message: Joi.string().alphanum().min(1).max(500).required(),
  }).validate(value);

  if (validationResult.error) {
    throw new Error("Invalid payload");
  }

  return validationResult.value;
};
