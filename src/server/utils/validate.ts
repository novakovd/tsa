import Joi, { AnySchema } from "joi";
import { MessagePayload, SecureIdPayload } from "../../shared/types/payload";
import { getConfig, getLogger } from "./container";
import { ConfigPropsAware } from "../types/config";
import process from "process";
import * as dotenv from "dotenv";
import * as fs from "fs";

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

export const validateSecureid = (payload: SecureIdPayload): SecureIdPayload => {
  const validationResult = Joi.object({
    secureId: Joi.string().required(),
  }).validate(payload);

  if (validationResult.error) throw validationResult.error;

  return validationResult.value;
};

export const validateEnv = (): ConfigPropsAware => {
  const defaults = dotenv.parse(fs.readFileSync(".env.defaults"));

  const validate = <T>(schema: AnySchema, envName: string): T => {
    const validator = (v: string) => schema.required().validate(v);
    const result = validator(process.env[envName]!);

    if (result.error) {
      getLogger().info(
        `Environment variable ${envName} value invalid, using default value: ${defaults[envName]}`
      );

      return validator(defaults[envName]).value;
    }

    return result.value;
  };

  return {
    appPort: validate<number>(Joi.number().integer(), "PORT"),
    appHostname: validate<string>(Joi.string().hostname(), "APP_HOSTNAME"),
    appProto: validate<string>(
      Joi.string().valid("http", "https"),
      "APP_PROTO"
    ),
    maxTextLength: validate<number>(
      Joi.number().integer().min(1).max(1000),
      "MAX_TEXT_LENGTH"
    ),
  };
};
