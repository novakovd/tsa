import { Request, Response } from "express";
import { findMessage } from "../repositories/message";
import { removeMessage } from "../repositories/message";
import { SecureIdPayload } from "../../shared/types/payload";
import { HTMLResponse } from "../types/response";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { validateSecureId } from "../validators/payload";
import { HTTPNotFoundError } from "../types/error";
import { renderView } from "../providers/system";
import { wrapAsyncRoute } from "../providers/system";

const route = async (
  req: Request<SecureIdPayload>,
  res: Response<HTMLResponse>
) => {
  const message = await findMessage(validateSecureId(req.body).secureId);

  if (null === message) throw new HTTPNotFoundError("Message not found");

  await removeMessage(req.body.secureId);

  res.send({
    message: getReasonPhrase(StatusCodes.OK),
    html: renderView("reveal", {
      messageValue: message.value,
    }),
  });
};

export const reveal = wrapAsyncRoute(route);
