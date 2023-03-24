import { NextFunction, Request, Response } from "express";
import { validateMessage } from "../utils/validate";
import { generateMessageUrl } from "../utils/url";
import { saveMessage } from "../repositories/message";
import { MessagePayload } from "../../shared/types/payload";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { HTMLResponse } from "../types/response";
import { getQrCodeDataUrl } from "../utils/url";
import { renderView } from "../utils/render-view";

export const save = async (
  req: Request<MessagePayload>,
  res: Response<HTMLResponse>,
  next: NextFunction
) => {
  try {
    validateMessage(req.body);
  } catch (e: unknown) {
    return next(e);
  }

  const msg = await saveMessage(req.body.message);
  const url = generateMessageUrl(msg.secureId);
  const qrCodeUrl = await getQrCodeDataUrl(url);

  res.status(StatusCodes.OK).send({
    message: getReasonPhrase(StatusCodes.OK),
    html: renderView("save", {
      url: url,
      qrCodeUrl: qrCodeUrl,
    }),
  });
};
