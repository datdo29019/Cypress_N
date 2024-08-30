/// <reference types="cypress" />

context('Aliasing', () => {
    beforeEach(() => {
        cy.visit('http://192.168.1.10:1199/')
    })

    it('Trung tâm ở đâu', () => {
        // Alias a DOM element for use later
        // We don't have to traverse to the element
        // later in our code, we reference it with @

        cy.get('#component-5 > label > .wrap > .wrap-inner').click()
        cy.get('[data-value="VUS_Xperiment"]').click()
        //cy.get('#text > label.svelte-1pie7s6 > [data-testid="textbox"]').focus().type('Trung tâm ở đâu{enter}')
        cy.get('#text > label.svelte-1pie7s6 > [data-testid="textbox"]').focus().type('Học phí khóa Smart kids là bao nhiêu{enter}')
        //cy.get('[data-testid="bot"] > :nth-child(6)').should('have.value' , 'Keywords: Trung tâm')
        cy.contains('7.600.000 VNĐ', { timeout: 7000 }).should('be.visible')

        // when we reference the alias, we place an

    })

})
