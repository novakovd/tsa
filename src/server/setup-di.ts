import { Container } from "typedi";
import { PrismaClient } from "@prisma/client";
import { Config } from "./types/config";
import process from "process";
import winston, { Logger } from "winston";

export const setupDi = () => {
  Container.set(PrismaClient, new PrismaClient());

  Container.set(
    Config,
    new Config({
      appPort: process.env.PORT!,
      databaseUrl: process.env.DATABASE_URL!,
      appHostname: process.env.APP_HOSTNAME!,
      appProto: process.env.APP_PROTO!,
    })
  );

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
        new winston.transports.Console({ level: "error" }),
        new winston.transports.Console(),
      ],
    })
  );
};
