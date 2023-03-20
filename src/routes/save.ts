import { Request, Response } from "express";
import QRCode from "qrcode";
import { validateMessage } from "../services/message-validator";
import { generateMessageUrl } from "../services/message-url-provider";
import { saveMessage } from "../services/message-saver";

export const save = async (req: Request, res: Response) => {
  const msg = await saveMessage(validateMessage(req.body).message);
  const url = generateMessageUrl(msg.secureId);
  const qrCodeUrl = await QRCode.toDataURL(url);

  res.render("save", { url: url, qrCodeUrl: qrCodeUrl });
};
