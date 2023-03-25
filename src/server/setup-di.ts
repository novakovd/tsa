import { Container } from "typedi";
import { PrismaClient } from "@prisma/client";
import { Config } from "./types/config";
import winston from "winston";
import { validateEnv } from "./utils/validate";

export const setupDi = () => {
  Container.set(
    "Logger",
    winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.File({
          filename: "error.log",
          dirname: "logs",
          level: "error",
        }),
        new winston.transports.File({
          filename: "combined.log",
          dirname: "logs",
        }),
        new winston.transports.Console(),
      ],
    })
  );

  Container.set(PrismaClient, new PrismaClient());

  Container.set(Config, new Config(validateEnv()));
};
