interface MessagePayload {
  message: string;
}

async function postData(data: MessagePayload) {
  return fetch("/s", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
}

const getElement = (
  selector: string,
  parent: Element | null = null
): Element => {
  const selectFrom = null === parent ? document : parent;
  const element = selectFrom.querySelector(selector);

  if (null === element) {
    throw new Error("Error bootstrapping app");
  }

  return element;
};

document.addEventListener("DOMContentLoaded", () => {
  const mainAppContainer = getElement("#main-app-container");
  const form = getElement("#message-form", mainAppContainer);
  const submitButton = getElement("#submit-button", form);

  const messageText = getElement("#message-text") as HTMLDataElement;

  submitButton.addEventListener("click", () => {
    postData({ message: messageText.value })
      .then((r) => r.text())
      .then((html) => {
        mainAppContainer.innerHTML = html;
      });
  });
});
