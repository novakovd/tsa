import { getElement, getMessageTextareaElement } from "../providers/element";
import { TargetAware } from "../types/element";

class Event<T extends HTMLElement> implements TargetAware<T> {
  readonly target: T;
  private readonly bindHandler: (target: T) => void;

  constructor(target: T, bindHandler: (target: T) => void) {
    this.target = target;
    this.bindHandler = bindHandler;
  }

  bind() {
    this.bindHandler(this.target);
  }
}

export const createCopyToClipboardEvent = (
  getValue: () => string
): Event<HTMLButtonElement> => {
  return new Event(
    getElement<HTMLButtonElement>("#copy-to-clipboard-button"),
    (target) => {
      target.addEventListener("click", () =>
        navigator.clipboard.writeText(getValue())
      );
    }
  );
};

export const createCharsCounterEvent = (): Event<HTMLTextAreaElement> => {
  return new Event(getMessageTextareaElement(), (target) => {
    target.addEventListener("input", () => {
      getElement<HTMLSpanElement>("#chars-counter-current").innerHTML =
        target.value.length.toString();
    });
  });
};
