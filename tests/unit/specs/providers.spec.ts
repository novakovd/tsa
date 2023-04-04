import { describe, it } from "mocha";
import { expect } from "chai";
import { Config, ConfigPropsAware } from "../../../src/server/types/config";
describe("Providers", () => {
  const configPros: ConfigPropsAware = {
    appHostname: "localhost",
    appPort: 8080,
    appProto: "http",
    maxTextLength: 500,
  };
  const databaseUrl = "file:../data/prod.db";
  const viewsPath = "./src/server/views";

  describe("Config", () => {
    const config = new Config(configPros);

    it("appHostname prop should be valid hostname", () => {
      expect(config.appHostname).eq(configPros.appHostname);
    });

    it("appPort prop should be valid port number", () => {
      expect(config.appPort).eq(configPros.appPort);
    });

    it("appProto prop should be valid protocol name", () => {
      expect(config.appProto).eq(configPros.appProto);
    });

    it("databaseUrl prop should be valid database url", () => {
      expect(config.databaseUrl).eq(databaseUrl);
    });

    it("maxTextLength prop should be valid number", () => {
      expect(config.maxTextLength).eq(500);
    });

    it("appUrl prop should be valid url", () => {
      expect(config.appUrl).eq(
        `${config.appProto}://${config.appHostname}:${config.appPort}`
      );
    });

    it("viewsPath prop should be valid path", () => {
      expect(config.viewsPath).eq(viewsPath);
    });
  });
});
