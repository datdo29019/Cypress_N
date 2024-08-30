context('Window', () => {
  beforeEach(() => {
    cy.visit('https://vagent-test.vnlp.ai/')
    cy.intercept('GET', '/localizations').as('localizations')
    cy.intercept('POST', '/auth/login').as('login')

    cy.get('#username').type('datgpt')
    cy.get('#password').type('123123')
    cy.get('.va-button').click()

  })

  it('Forgot password', () => {


  
  })


 /*   it('URL Forgot > Login', () => {
      cy.contains('Quên mật khẩu?').click()
      cy.wait(500)
       cy.contains('Quay lại').click()
       cy.url().should('include', '/auth/login') // => true
       cy.url().should('eq', 'https://vagent-test.vnlp.ai/#/auth/login') // => true  
     }) */
 
     




})


