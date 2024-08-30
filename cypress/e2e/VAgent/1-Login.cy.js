context('Window', () => {
  beforeEach(() => {
    cy.visit('https://vagent-test.vnlp.ai/')
    cy.intercept('GET', '/localizations').as('localizations')
    cy.intercept('POST', '/auth/login').as('login')

  })

  it('Login Vagent', () => {
    cy.wait(500)
    cy.get('.va-button').should('be.disabled') //Disabled button khi chưa nhập gì hết

    cy.get('#username').should('have.attr', 'placeholder', 'Nhập tên đăng nhập')
    cy.get('#password').should('have.attr', 'placeholder', 'Nhập mật khẩu')


    cy.get('#username').type('123123')
    cy.get('.va-button').should('be.disabled') //Disabled button khi chưa nhập gì hết

    cy.get('#password').type('Taonemay123')
    cy.get('.va-button').should('be.enabled') //Enabled 

    cy.get('#password').type('{selectall}{backspace}')
    cy.get('.va-button').should('be.disabled') //Disabled

    cy.get('#username').type('{selectall}{backspace}')
    cy.get('.va-button').should('be.disabled') //Disabled

    cy.get('#username').type('dat') //Tài khoản sai
    cy.get('#password').type('1') //Mật khẩu sai
    cy.get('.va-button').click()
    cy.wait('@login')
    cy.get('.va-error-message').should('contain', 'Tên đăng nhập hoặc mật khẩu chưa đúng')

    cy.get('#username').type('{selectall}{backspace}datgpt')
    cy.get('#password').type('1') //Mật khẩu sai
    cy.get('.va-button').click()
    cy.wait('@login')
    cy.get('.va-error-message').should('contain', 'Tên đăng nhập hoặc mật khẩu chưa đúng')

    cy.get('#username').type('{selectall}{backspace}datgp') //Tài khoản sai
    cy.get('#password').type('123123')
    cy.get('.va-button').click()
    cy.wait('@login')
    cy.get('.va-error-message').should('contain', 'Tên đăng nhập hoặc mật khẩu chưa đúng')

    cy.get('#username').type('{selectall}{backspace}datgpt') //Tài khoản đúng
    cy.get('#password').type('{selectall}{backspace}123123')  //Mật khẩu đúng

    cy.get('.show-password-icon').click() //Show-password
    cy.get('#password')
      .should('be.visible')
      .should('have.value', '123123')

    cy.get('.va-button').click()
    cy.wait('@login')
  })

    it('URL Forgot password', () => {
      cy.contains('Quên mật khẩu?').click()
      cy.url().should('include', '/auth/forgot-password') // => true
      cy.url().should('eq', 'https://vagent-test.vnlp.ai/#/auth/forgot-password') // => true
    })

    it('URL Register', () => {
      cy.contains('Đăng ký').click()
      cy.url().should('include', '/auth/register') // => true
      cy.url().should('eq', 'https://vagent-test.vnlp.ai/#/auth/register') // => true
    })





  })


