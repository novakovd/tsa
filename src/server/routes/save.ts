import { Request, Response } from "express";
import { validateMessage } from "../validators/payload";
import { createMessageUrl } from "../creators/url";
import { saveMessage } from "../repositories/message";
import { MessagePayload } from "../../shared/types/payload";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { HTMLResponse } from "../types/response";
import { createQrCodeDataUrl } from "../creators/url";
import { renderView } from "../providers/system";
import { wrapAsyncRoute } from "../providers/system";

const route = async (
  req: Request<MessagePayload>,
  res: Response<HTMLResponse>
) => {
  const msg = await saveMessage(validateMessage(req.body).message);
  const url = createMessageUrl(msg.secureId);
  const qrCodeUrl = await createQrCodeDataUrl(url);

  res.status(StatusCodes.OK).send({
    message: getReasonPhrase(StatusCodes.OK),
    html: renderView("save", {
      url: url,
      qrCodeUrl: qrCodeUrl,
    }),
  });
};

export const save = wrapAsyncRoute(route);
