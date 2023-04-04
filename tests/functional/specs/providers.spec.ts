import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import {
  getLogger,
  getPrismaClient,
  getConfig,
} from "../../../src/server/providers/container-service";
import { PrismaClient } from "@prisma/client";
import { Config } from "../../../src/server/types/config";

describe("Providers", () => {
  const WinstonGeneratedClassname = "DerivedLogger";

  describe("Config", () => {
    it("Should be valid Config instance", () => {
      expect(getConfig()).instanceof(Config);
    });
  });

  describe("Database client", () => {
    it("Should be valid Prisma instance", () => {
      expect(getPrismaClient()).instanceof(PrismaClient);
    });
  });

  describe("Logger", () => {
    it("Should be valid Winston instance", () => {
      expect(getLogger().constructor.name).eq(WinstonGeneratedClassname);
    });
  });
});
