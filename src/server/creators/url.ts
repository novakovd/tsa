import QRCode from "qrcode";
import { getConfig } from "../providers/container-service";

export const createMessageUrl = (secureId: string) => {
  return `${getConfig().appUrl}/${secureId}`;
};

export const createQrCodeDataUrl = async (url: string) => {
  return QRCode.toDataURL(url, { width: 204 });
};
