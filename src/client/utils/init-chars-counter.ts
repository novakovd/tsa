import { getElement } from "./get-element";
import { getMessageTextarea } from "./get-message-textarea";

export const initCharsCounter = () => {
  const counter = getElement<HTMLSpanElement>("#chars-counter-current");
  const textArea = getMessageTextarea();

  textArea.addEventListener("input", () => {
    counter.innerHTML = textArea.value.length.toString();
  });
};
