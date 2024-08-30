context('Responses', () => {
	beforeEach(() => {

		cy.visit('https://va-test.vnlp.ai/')

	})

	// https://on.cypress.io/interacting-with-elements

	it('Search Response', () => {


		//API
		cy.intercept('/auth/login').as('login')
		//API
		cy.intercept('/v1/responses').as('respon')

		cy.get('#username')

			// Delay each keypress by 0.2 sec
			.type('dat.do', { delay: 200 })
			.should('have.value', 'dat.do')

		cy.get('#password')
			.type('taonemay123').should('have.value', 'taonemay123')

		cy.get('.btn').click()
		//Get Home
		cy.contains('Faker').click()

		cy.wait('@login')
		cy.contains('Build Bots', { timeout: 10000 }).click() //Open Conversations
		cy.contains('Bot Flow - v1', { timeout: 10000 }).click()
		cy.contains('Responses', { timeout: 10000 }).click()


		
		/*Sw
		cy.wait(1800)
		cy.contains('Quick res', { timeout: 10000 }).click()
		cy.get('.section-main > :nth-child(1) > .ng-untouched').type('{del}{selectall}{backspace}Quick T')
		cy.get('.section-main > :nth-child(3) > .p-inputwrapper-filled > .p-dropdown > .p-dropdown-label').click({ force: true })
		cy.wait(700)
		cy.get(':nth-child(1) > .p-dropdown-item').click({ force: true })
		cy.get('.position-relative > .mb-3 > .ng-untouched').type('Text')
		cy.contains('Save').click({ force: true }) 
		
		*/

	})
})


