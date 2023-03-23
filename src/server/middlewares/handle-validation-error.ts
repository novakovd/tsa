import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { HTMLResponse } from "../../shared/types/response";
import { ValidationError } from "joi";

export const handleValidationError = (
  err: Error,
  req: Request,
  res: Response<HTMLResponse>,
  next: NextFunction
) => {
  if (!(err instanceof ValidationError)) return next(err);

  res.status(StatusCodes.BAD_REQUEST).send({
    message: err.message,
    html: null,
  });
};