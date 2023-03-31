import { NextFunction, Request, Response } from "express";
import { HTMLResponse } from "../types/response";
import { HTTPError } from "../types/error";

export const handleHTTPError = (
  err: Error,
  req: Request,
  res: Response<HTMLResponse>,
  next: NextFunction
) => {
  if (!(err instanceof HTTPError)) return next(err);

  return res.status(err.statusCode).send({
    message: err.message,
    html: null,
  });
};
