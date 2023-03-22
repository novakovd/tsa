import * as fs from "fs";

export const getWebpackBuildHash = (): string => {
  const data = JSON.parse(
    fs.readFileSync("dist/webpack-build-hash.json", "utf-8")
  );

  if ("hash" in data) {
    return data.hash;
  }

  return Math.random().toString(36).slice(2);
};
