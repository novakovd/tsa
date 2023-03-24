import QRCode from "qrcode";
import { getConfig } from "./container";

export const generateMessageUrl = (secureId: string) => {
  return `${getConfig().appUrl}/r/${secureId}`;
};

export const getQrCodeDataUrl = async (url: string) => {
  return QRCode.toDataURL(url, { width: 204 });
};
