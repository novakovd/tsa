import { getElement } from "./get-element";

export const getDynamicLoadContainer = (): HTMLSpanElement =>
  getElement<HTMLSpanElement>("#dynamic-load-container");
