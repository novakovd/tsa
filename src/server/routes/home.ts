import { Request, Response } from "express";
import { getConfig } from "../utils/container";

export const home = (req: Request, res: Response) => {
  res.render("home", { maxTextLength: getConfig().maxTextLength });
};
