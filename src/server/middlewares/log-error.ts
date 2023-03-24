import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../types/response";
import { getLogger } from "../utils/container";

export const LogError = (
  err: Error,
  req: Request,
  res: Response<GenericResponse>,
  next: NextFunction
) => {
  getLogger().error(err.stack ?? err.message);

  next(err);
};
