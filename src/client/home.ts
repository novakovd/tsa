import "./app.css";
import { fetchPage } from "./utils/fetch-page";
import { getElement } from "./utils/get-element";
import { bindCopyToClipboard } from "./utils/bind-copy-to-clipboard";
import { getDynamicLoadContainer } from "./utils/get-dynamic-load-container";
import { getMessageTextarea } from "./utils/get-message-textarea";

interface MessagePayload {
  message: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = getElement<HTMLButtonElement>("#submit-button");

  submitButton.addEventListener("click", async () => {
    getDynamicLoadContainer().innerHTML = await fetchPage<MessagePayload>(
      "/save",
      {
        message: getMessageTextarea().value,
      }
    );

    bindCopyToClipboard(() => getElement<HTMLLinkElement>("#message-url").href);
  });
});
