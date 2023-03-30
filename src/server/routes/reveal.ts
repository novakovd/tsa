import { Request, Response } from "express";
import { SecureIdPayload } from "../../shared/types/payload";
import { HTMLResponse } from "../types/response";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { renderView } from "../providers/system";
import { wrapAsyncRoute } from "../providers/system";
import { revealMessageCommand } from "../commands/message";

const route = async (
  req: Request<SecureIdPayload>,
  res: Response<HTMLResponse>
) => {
  const message = await revealMessageCommand(req.body);

  res.send({
    message: getReasonPhrase(StatusCodes.OK),
    html: renderView("reveal", {
      messageValue: message.value,
    }),
  });
};

export const reveal = wrapAsyncRoute(route);
