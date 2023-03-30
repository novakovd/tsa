import { ConfigPropsAware } from "../types/config";
import * as dotenv from "dotenv";
import fs from "fs";
import Joi, { AnySchema } from "joi";
import process from "process";
import { getLogger } from "../providers/container-service";

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
    appPort: validate<number>(Joi.number().integer(), "APP_PORT"),
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
