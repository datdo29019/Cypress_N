context('Proactive messages', () => {
  beforeEach(() => {
    //cy.viewport(1765, 968)
    const cyView = require("cy-view");

    const devices = [
      {
        model: "macbook-15",
        width: 1440,
        height: 900
      }];
    const urls = [
      "https://va-test.vnlp.ai/"
    ];
    const washingMachinePageTests = cyView(devices);

    //cy.visit('https://va-test.vnlp.ai/')

  })
  washingMachinePageTests(urls, () => {
    describe("My tests running on all viewports across various URLs", () => {
      // https://on.cypress.io/interacting-with-elements
      it('Dragtest', () => {
        // https://on.cypress.io/type
        cy.get('#username')
          // Delay each keypress by 0.2 sec
          .type('dat.do')
          .should('have.value', 'dat.do')

        cy.get('#password')
          .type('taonemay123').should('have.value', 'taonemay123')
        cy.get('.btn').click()

        //API
        cy.intercept('/auth/login').as('login')
        //API
        cy.intercept('/api/v1/sample-inputs').as('sample')
        //API
        cy.intercept('GET', 'https://apis-test.vnlp.ai/api/v1/sample-inputs?page=1&length=15&search=&intent=&sort=').as('true')


        //Get Home
        cy.contains('Auto').click()
        cy.wait(3500)
        cy.contains('Build Bots', { timeout: 10000 }).click() //Open Conversations
        cy.wait(1000)
        cy.contains('Bot Flows - v2', { timeout: 7000 }).click()
        cy.wait(3000)


        //cy.contains('Bot says').trigger('dragstart')
        // cy.get('.parent-drawflow').trigger('drop')

        cy.get('.card-drag').eq(0).drag('.drawflow')
        //cy.contains('Start Conversation').drag('.drawflow')

      })
    })
  });
});