import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../types/response";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const handleGenericError = (
  err: Error,
  req: Request,
  res: Response<GenericResponse>,
  next: NextFunction
) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  });

  next();
};
