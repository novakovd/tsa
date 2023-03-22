import { getElement } from "./get-element";

export const getMessageTextarea = (): HTMLTextAreaElement =>
  getElement<HTMLTextAreaElement>("#message-textarea");
