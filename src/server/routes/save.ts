import { NextFunction, Request, Response } from "express";
import QRCode from "qrcode";
import { validateMessage } from "../utils/message/validate-message";
import { generateMessageUrl } from "../utils/message/get-message-url";
import { saveMessage } from "../utils/message/save-message";
import { MessagePayload } from "../../shared/types/payload";
import * as pug from "pug";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { resolveViewPath } from "../utils/resolve-view-path";
import { HTMLResponse } from "../../shared/types/response";

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
  const qrCodeUrl = await QRCode.toDataURL(url, { width: 204 });

  res.status(StatusCodes.OK).send({
    message: getReasonPhrase(StatusCodes.OK),
    html: pug.renderFile(resolveViewPath(req.app, "save"), {
      url: url,
      qrCodeUrl: qrCodeUrl,
    }),
  });
};
