import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../types/response";
import { getLogger } from "../providers/container-service";

export const LogError = (
  err: Error,
  req: Request,
  res: Response<GenericResponse>,
  next: NextFunction
) => {
  getLogger().error(err.stack ?? err.message);

  next(err);
};
