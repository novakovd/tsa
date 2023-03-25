import { NextFunction, Request, Response } from "express";
import { customAlphabet } from "nanoid";
import * as fs from "fs";
import { LocalsObject, Options } from "pug";
import * as pug from "pug";
import { getConfig } from "./container";

export const wrapAsyncRoute =
  (route: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(route(req, res)).catch(next);

export const generateSecureId = (): string => {
  return customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 10)();
};

export const getWebpackBuildHash = (): string => {
  const data = JSON.parse(
    fs.readFileSync("dist/webpack-build-hash.json", "utf-8")
  );

  if ("hash" in data) {
    return data.hash;
  }

  return Math.random().toString(36).slice(2);
};

export const renderView = (
  name: string,
  options: Options & LocalsObject
): string => {
  return pug.renderFile(`${getConfig().viewsPath}/${name}.pug`, options);
};
