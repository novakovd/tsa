import { getElement } from "./utils/get-element";
import { fetchPage } from "./utils/fetch-page";

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = getElement("#main-app-container");
  const revealMessageButton = getElement(
    "#reveal-message-button",
    mainContainer
  );

  revealMessageButton.addEventListener("click", (e) => {
    fetchPage<DOMStringMap>(
      "/reveal",
      (e.target as HTMLDataElement).dataset
    ).then((html) => {
      mainContainer.innerHTML = html;
    });
  });
});
