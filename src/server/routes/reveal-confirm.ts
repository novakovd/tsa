import { Request, Response } from "express";
import { findMessage } from "../repositories/message";

export const revealConfirm = async (req: Request, res: Response) => {
  const message = await findMessage(req.params.secureId);

  if (null === message) return res.render("not-found");

  res.render("reveal-confirm", { secureId: message.secureId });
};
