import { TargetAware } from "../types/element";

class HiddenElement<T extends HTMLElement> implements TargetAware<T> {
  readonly target: T;
  private readonly hiddenClassName = "hidden";

  constructor(target: T) {
    if (!target.classList.contains("hidden")) {
      throw new Error(`Element lacks required class ${this.hiddenClassName}`);
    }

    this.target = target;
  }

  show() {
    this.target.classList.remove(this.hiddenClassName);
  }
}

export const getElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);

  if (null === element) {
    throw new Error(`Element that matches selector ${selector} not found`);
  }

  return element;
};

export const getDynamicLoadContainerElement = (): HTMLSpanElement =>
  getElement<HTMLSpanElement>("#dynamic-load-container");

export const getMessageTextareaElement = (): HTMLTextAreaElement =>
  getElement<HTMLTextAreaElement>("#message-textarea");

export const getUnexpectedErrorElement = (): HiddenElement<HTMLDivElement> => {
  return new HiddenElement<HTMLDivElement>(
    getElement<HTMLDivElement>("#unexpected-error")
  );
};
