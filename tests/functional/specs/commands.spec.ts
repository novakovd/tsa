import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import "dotenv-defaults/config";
import { getConfig } from "../../../src/server/providers/container-service";
import {
  revealMessageCommand,
  saveMessageCommand,
} from "../../../src/server/commands/message";
import { setupDi } from "../../../src/server/setup-di";
import { SECURE_ID_REGEX } from "../../constants";
import { HTTPNotFoundError } from "../../../src/server/types/error";

describe("Commands", () => {
  setupDi();

  process.env.DATABASE_URL = getConfig().databaseUrl;

  const messageContent = "Hello world";

  describe("Save message", () => {
    it("Message should contain given value and valid secureId", async () => {
      const savedMessage = await saveMessageCommand({
        message: messageContent,
      });

      expect(savedMessage.value).eq(messageContent);
      expect(savedMessage.secureId).matches(SECURE_ID_REGEX);
    });
  });

  describe("Reveal message", () => {
    it("Message should be revealed with given secure id deleted afterwords", async () => {
      const savedMessage = await saveMessageCommand({
        message: messageContent,
      });
      const revealedMessage = await revealMessageCommand({
        secureId: savedMessage.secureId,
      });

      expect(revealedMessage.value).eq(messageContent);
      expect(revealedMessage.secureId).eq(savedMessage.secureId);

      try {
        await revealMessageCommand({
          secureId: savedMessage.secureId,
        });
      } catch (err: unknown) {
        expect(err).instanceof(HTTPNotFoundError);
      }
    });
  });
});
