import { Request, Response } from "express";
import { createMessageUrl } from "../creators/url";
import { MessagePayload } from "../../shared/types/payload";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { HTMLResponse } from "../types/response";
import { createQrCodeDataUrl } from "../creators/url";
import { renderView } from "../providers/system";
import { wrapAsyncRoute } from "../providers/system";
import { saveMessageCommand } from "../commands/message";

const route = async (
  req: Request<MessagePayload>,
  res: Response<HTMLResponse>
) => {
  const message = await saveMessageCommand(req.body);
  const url = createMessageUrl(message.secureId);
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
