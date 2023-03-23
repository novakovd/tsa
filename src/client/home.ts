import "./app.css";
import { fetchPage } from "./utils/fetch-page";
import { getElement } from "./utils/get-element";
import { bindCopyToClipboard } from "./utils/bind-copy-to-clipboard";
import { getDynamicLoadContainer } from "./utils/get-dynamic-load-container";
import { getMessageTextarea } from "./utils/get-message-textarea";
import { MessagePayload } from "../shared/types/payload";
import { initCharsCounter } from "./utils/init-chars-counter";
import { showUnexpectedError } from "./utils/show-unexpected-error";

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = getElement<HTMLButtonElement>("#submit-button");
  const messageForm = getElement<HTMLFormElement>("#message-form");

  initCharsCounter();

  submitButton.addEventListener("click", async () => {
    if (!messageForm.reportValidity()) return;

    try {
      getDynamicLoadContainer().innerHTML = await fetchPage<MessagePayload>(
        "/save",
        {
          message: getMessageTextarea().value,
        }
      );
    } catch {
      showUnexpectedError();

      return;
    }

    bindCopyToClipboard(() => getElement<HTMLLinkElement>("#message-url").href);
  });
});
