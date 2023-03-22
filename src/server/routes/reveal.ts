import { Request, Response } from "express";
import { findMessage } from "../utils/message/find-message";
import { removeMessage } from "../utils/message/remove-message";

interface SecureIdPayload {
  secureid: string;
}

export const reveal = async (req: Request<SecureIdPayload>, res: Response) => {
  const message = await findMessage(req.body.secureid);

  await removeMessage(req.body.secureid);

  res.render("reveal", { messageValue: message?.value });
};
