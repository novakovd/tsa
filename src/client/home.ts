import "./app.css";
import { fetchPage } from "./utils/fetch-page";
import { getElement } from "./utils/get-element";

interface MessagePayload {
  message: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = getElement("#main-app-container");
  const messageForm = getElement("#message-form", mainContainer);
  const messageText = getElement(
    "#message-text",
    messageForm
  ) as HTMLTextAreaElement;
  const submitButton = getElement("#submit-button", messageForm);

  submitButton.addEventListener("click", () => {
    fetchPage<MessagePayload>("/save", { message: messageText.value }).then(
      (html: string) => {
        mainContainer.innerHTML = html;
      }
    );
  });
});
