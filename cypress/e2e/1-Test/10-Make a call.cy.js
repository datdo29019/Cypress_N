/**


  -
**/
context('Settings', () => {
    beforeEach(() => {

        cy.visit('https://va-test.vnlp.ai/')
                // https://on.cypress.io/type
                cy.get('#username')

                // Delay each keypress by 0.2 sec
                .type('dat.do')
                .should('have.value', 'dat.do')
    
            cy.get('#password')
                .type('taonemay123').should('have.value', 'taonemay123')
    
            cy.get('.btn').click()

    })

    // https://on.cypress.io/interacting-with-elements

    it('.type() - Login - Make a call', () => {


        //API
        cy.intercept('/auth/login').as('login')
        cy.wait(1500)
        //Chuyển EN
        cy.contains(' EN ').click()
        cy.wait(1000)
        cy.contains('English', { timeout: 2000 }).click()


        cy.contains('Faker1').click({ timeout: 10000 })
        cy.wait(4500)
        //API
        cy.intercept('/bots').as('bots')       
    })

    it('.type() - Make a call. DOM element', () => {


    })
})