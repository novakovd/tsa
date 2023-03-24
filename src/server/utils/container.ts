import { Container } from "typedi";
import { Config } from "../types/config";
import { PrismaClient } from "@prisma/client";
import { Logger } from "winston";

export const getConfig = (): Config => {
  return Container.get(Config);
};

export const getPrismaClient = (): PrismaClient => {
  return Container.get(PrismaClient);
};

export const getLogger = (): Logger => {
  return Container.get("Logger");
};
