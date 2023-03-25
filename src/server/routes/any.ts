import { Request, Response } from "express";
import { getLogger } from "../utils/container";

export const any = (req: Request, res: Response) => {
  getLogger().info(`Requested undefined route ${req.path}, redirecting to /`);

  res.redirect("/");
};
