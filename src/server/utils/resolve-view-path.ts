import { Application } from "express";
import * as path from "path";

export const resolveViewPath = (app: Application, name: string): string => {
  return path.join(app.get("views"), name + ".pug");
};
