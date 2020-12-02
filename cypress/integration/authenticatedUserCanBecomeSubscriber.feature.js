describe("User can become subscriber", () => {
  describe("Successfully", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/auth",
        response: "fixture:sucessfull_sign_up.json",
        headers: {
          uid: "thomas@craft.com",
          access_token: "whatever",
          client: "12345",
          token_type: "Bearer",
          expiry: 1699999,
        },
      });
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: "fixture:product_data.json",
      });
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/subscriptions",
        response: "fixture:stripe_response.json"
      });
      cy.visit("/");
      cy.get('[data-cy="register-cta"]').click();
      cy.get('[data-cy="email"]').type("thomas@craft.com");
      cy.get('[data-cy="password"]').type("password");
      cy.get('[data-cy="password-confirmation"]').type("password");
      cy.get('[data-cy="register"]').click();
    });

    it("by filling in valid credit card information", () => {
      cy.get('[data-cy="become-subscriber"]').click();
      //cy.get('[data-cy="payment-form"]').should('exist')

      
      cy.get('[data-cy="payment-form"]').within(() => {
        cy.get('[data-cy="card-number"]').within(() => {
          cy.wait(1000);
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="cardnumber"]')
              .type("4242424242424242", { delay: 10 });
          });
        });
        cy.get('[data-cy="card-expiry"]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="exp-date"]')
              .type("1222", { delay: 10 });
          });
        });
        cy.get('[data-cy="card-cvc"]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find("body");
            cy.wrap($body)
              .find('input[name="cvc"]')
              .type("424", { delay: 10 });
          });
        });
        cy.get("button").contains('Confirm Payment').click()
      });
      cy.get('[data-cy="payment-message"]').contains('Thank you for your money, you are now a subscriber!')
    });
  });
});
