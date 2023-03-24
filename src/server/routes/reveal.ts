import { NextFunction, Request, Response } from "express";
import { findMessage } from "../repositories/message";
import { removeMessage } from "../repositories/message";
import { SecureIdPayload } from "../../shared/types/payload";
import { HTMLResponse } from "../types/response";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { validateSecureid } from "../utils/validate";
import { HTTPNotFoundError } from "../types/error";
import { renderView } from "../utils/render-view";

export const reveal = async (
  req: Request<SecureIdPayload>,
  res: Response<HTMLResponse>,
  next: NextFunction
) => {
  try {
    validateSecureid(req.body);
  } catch (e: unknown) {
    return next(e);
  }

  const message = await findMessage(req.body.secureId);

  if (null === message) return next(new HTTPNotFoundError("Message not found"));

  await removeMessage(req.body.secureId);

  res.send({
    message: getReasonPhrase(StatusCodes.OK),
    html: renderView("reveal", {
      messageValue: message.value,
    }),
  });
};
