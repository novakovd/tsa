import { Request, Response } from "express";
import { HTTPNotFoundError } from "../types/error";

export const home = (req: Request, res: Response) => {
  res.render("home");
};
