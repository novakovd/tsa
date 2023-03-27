describe("User full path", () => {
  it("passes", () => {
    cy.visit("/");

    cy.fixture("text.json").then((textFixtures) => {
      cy.getMessageTextarea().type(textFixtures.defaultTest);
      cy.getSubmitButton().click();
      cy.getMessageUrl().click();
      cy.getRevealMessageButton().click();
      cy.getMessageTextarea().should("have.value", textFixtures.defaultTest);
    });
  });
});
