import { getElement } from "./get-element";

export const bindCopyToClipboard = (getValue: () => string) => {
  getElement<HTMLButtonElement>("#copy-to-clipboard-button").addEventListener(
    "click",
    () => navigator.clipboard.writeText(getValue())
  );
};
