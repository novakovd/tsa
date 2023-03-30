import { Request, Response } from "express";
import { getConfig } from "../providers/container-service";

export const home = (req: Request, res: Response) => {
  res.render("home", { maxTextLength: getConfig().maxTextLength });
};
