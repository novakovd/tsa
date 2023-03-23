import { getElement } from "./utils/get-element";
import { fetchPage } from "./utils/fetch-page";
import { getDynamicLoadContainer } from "./utils/get-dynamic-load-container";
import { bindCopyToClipboard } from "./utils/bind-copy-to-clipboard";
import { getMessageTextarea } from "./utils/get-message-textarea";
import { SecureIdPayload } from "../shared/types/payload";
import { showUnexpectedError } from "./utils/show-unexpected-error";

document.addEventListener("DOMContentLoaded", () => {
  const revealMessageButton = getElement<HTMLButtonElement>(
    "#reveal-message-button"
  );

  revealMessageButton.addEventListener("click", async (e) => {
    try {
      getDynamicLoadContainer().innerHTML = await fetchPage<SecureIdPayload>(
        "/reveal",
        {
          secureId: (e.target as HTMLDataElement).dataset.secureid as string,
        }
      );
    } catch {
      showUnexpectedError();
    }

    bindCopyToClipboard(() => getMessageTextarea().value);
  });
});
