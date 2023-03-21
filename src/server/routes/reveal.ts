import { Request, Response } from "express";
import { findMessage } from "../utils/message/find-message";

export const reveal = async (req: Request, res: Response) => {
  const message = await findMessage(req.body.secureid);

  res.render("reveal", { messageValue: message?.value });
};
