import "reflect-metadata";
import "dotenv-defaults/config";
import { describe, it } from "mocha";
import { expect } from "chai";
import { createSecureId } from "../../../src/server/creators/secrets";
import { getConfig } from "../../../src/server/providers/container-service";
import { setupDi } from "../../../src/server/setup-di";
import {
  createMessageUrl,
  createQrCodeDataUrl,
} from "../../../src/server/creators/url";
import { SECURE_ID_REGEX } from "../../constants";

describe("Creators", () => {
  setupDi();

  const secureId = createSecureId();
  const expectedMessageUrl = `${getConfig().appUrl}/${secureId}`;
  const imageUrlRegex = new RegExp('(data:image\\/[^;]+;base64[^"]+)');

  describe("Secure id creation", () => {
    it("Should have 10 char length", () => {
      expect(secureId).length(10);
    });

    it("Should contain only lowercase ASCII and 0-9 digits", () => {
      expect(secureId).matches(SECURE_ID_REGEX);
    });
  });

  describe("Message url creation", () => {
    it("Should have APP_URL/SECURE_ID form", () => {
      expect(createMessageUrl(secureId)).eq(expectedMessageUrl);
    });
  });

  describe("Message QR code data url creation", () => {
    it("Should be valid data url", async () => {
      expect(await createQrCodeDataUrl(expectedMessageUrl)).matches(
        new RegExp(imageUrlRegex)
      );
    });
  });
});
