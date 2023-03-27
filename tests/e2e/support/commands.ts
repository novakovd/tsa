Cypress.Commands.add("getMessageTextarea", () => cy.get("#message-textarea"));
Cypress.Commands.add("getSubmitButton", () => cy.get("#submit-button"));
Cypress.Commands.add("getBody", () => cy.get("body"));
Cypress.Commands.add("getMessageUrl", () => cy.get("#message-url"));
Cypress.Commands.add("getRevealMessageButton", () =>
  cy.get("#reveal-message-button")
);
Cypress.Commands.add("getCopyToClipboardButton", () =>
  cy.get("#copy-to-clipboard-button")
);

Cypress.Commands.add("requestClipboardPermissions", () => {
  cy.wrap(
    Cypress.automation("remote:debugger:protocol", {
      command: "Browser.grantPermissions",
      params: {
        permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"],
        origin: window.location.origin,
      },
    })
  );
});
