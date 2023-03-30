import "./app.css";
import { getSavePage } from "./providers/page";
import { getElement, getUnexpectedErrorElement } from "./providers/element";
import { createCopyToClipboardEvent } from "./creators/event";
import { getDynamicLoadContainerElement } from "./providers/element";
import { getMessageTextareaElement } from "./providers/element";
import { createCharsCounterEvent } from "./creators/event";

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = getElement<HTMLButtonElement>("#submit-button");
  const messageForm = getElement<HTMLFormElement>("#message-form");

  createCharsCounterEvent().bind();

  submitButton.addEventListener("click", async () => {
    if (!messageForm.reportValidity()) return;

    try {
      getDynamicLoadContainerElement().innerHTML = await getSavePage({
        message: getMessageTextareaElement().value,
      });
    } catch {
      getUnexpectedErrorElement().show();

      return;
    }

    createCopyToClipboardEvent(
      () => getElement<HTMLLinkElement>("#message-url").href
    ).bind();
  });
});
