import { getElement, getUnexpectedErrorElement } from "./providers/element";
import { getRevealPage } from "./providers/page";
import { getDynamicLoadContainerElement } from "./providers/element";
import { createCopyToClipboardEvent } from "./creators/event";
import { getMessageTextareaElement } from "./providers/element";

document.addEventListener("DOMContentLoaded", () => {
  const revealMessageButton = getElement<HTMLButtonElement>(
    "#reveal-message-button"
  );
  const unexpectedError = getUnexpectedErrorElement();

  revealMessageButton.addEventListener("click", async (e) => {
    try {
      getDynamicLoadContainerElement().innerHTML = await getRevealPage({
        secureId: (e.target as HTMLDataElement).dataset.secureid as string,
      });
    } catch {
      unexpectedError.show();

      return;
    }

    createCopyToClipboardEvent(() => getMessageTextareaElement().value).bind();
  });
});
