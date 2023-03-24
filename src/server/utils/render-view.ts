import { LocalsObject, Options } from "pug";
import * as pug from "pug";
import { getConfig } from "./container";

export const renderView = (
  name: string,
  options: Options & LocalsObject
): string => {
  return pug.renderFile(`${getConfig().viewsPath}/${name}.pug`, options);
};
