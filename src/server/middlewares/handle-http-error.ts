import { NextFunction, Request, Response } from "express";
import { HTMLResponse } from "../../shared/types/response";
import { HTTPError } from "../../shared/types/error";

export const handleHTTPError = (
  err: Error,
  req: Request,
  res: Response<HTMLResponse>,
  next: NextFunction
) => {
  if (!(err instanceof HTTPError)) return next(err);

  res.status(err.statusCode).send({
    message: err.message,
    html: null,
  });
};
