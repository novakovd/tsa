describe("User copy to clipboard", () => {
  it("passes", async () => {
    cy.visit("/");

    cy.requestClipboardPermissions();

    cy.fixture("text.json").then((textFixtures) => {
      cy.getMessageTextarea().type(textFixtures.defaultTest);
      cy.getSubmitButton().click();
      cy.getBody().focus();
      cy.getCopyToClipboardButton().click();
      cy.getBody().focus();

      cy.window().then((window) => {
        window.navigator.clipboard.readText().then((text) => {
          cy.getMessageUrl()
            .get("attr", "href")
            .then((href) => expect(text).to.eq(href));
        });
      });
    });
  });
});
