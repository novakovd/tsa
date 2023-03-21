import { Request, Response } from "express";
import QRCode from "qrcode";
import { validateMessage } from "../utils/message/validate-message";
import { generateMessageUrl } from "../utils/message/get-message-url";
import { saveMessage } from "../utils/message/save-message";

export const save = async (req: Request, res: Response) => {
  const msg = await saveMessage(validateMessage(req.body).message);
  const url = generateMessageUrl(msg.secureId);
  const qrCodeUrl = await QRCode.toDataURL(url);

  res.render("save", { url: url, qrCodeUrl: qrCodeUrl });
};
