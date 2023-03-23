import { NextFunction, Request, Response } from "express";
import { findMessage } from "../utils/message/find-message";
import { removeMessage } from "../utils/message/remove-message";
import { SecureIdPayload } from "../../shared/types/payload";
import { HTMLResponse } from "../../shared/types/response";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { resolveViewPath } from "../utils/resolve-view-path";
import * as pug from "pug";
import { validateSecureid } from "../utils/validate-secureid";
import { NotFoundError } from "@prisma/client/runtime";
import { HTTPNotFoundError } from "../../shared/types/error";

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
    html: pug.renderFile(resolveViewPath(req.app, "reveal"), {
      messageValue: message.value,
    }),
  });
};
