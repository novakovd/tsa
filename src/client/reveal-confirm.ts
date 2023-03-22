import { getElement } from "./utils/get-element";
import { fetchPage } from "./utils/fetch-page";
import { getDynamicLoadContainer } from "./utils/get-dynamic-load-container";
import { bindCopyToClipboard } from "./utils/bind-copy-to-clipboard";
import { getMessageTextarea } from "./utils/get-message-textarea";

document.addEventListener("DOMContentLoaded", () => {
  const dynamicLoadContainer = getDynamicLoadContainer();
  const revealMessageButton = getElement<HTMLButtonElement>(
    "#reveal-message-button"
  );

  revealMessageButton.addEventListener("click", async (e) => {
    dynamicLoadContainer.innerHTML = await fetchPage<DOMStringMap>(
      "/reveal",
      (e.target as HTMLDataElement).dataset
    );

    bindCopyToClipboard(() => getMessageTextarea().value);
  });
});
