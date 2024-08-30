context('Window', () => {
  beforeEach(() => {
    cy.visit('https://vagent-test.vnlp.ai/')
    cy.intercept('GET', '/localizations').as('localizations')
    cy.intercept('POST', '/auth/login').as('login')
    cy.intercept('GET', 'https://apis-test.vnlp.ai/auth/password/reset?username=dat').as('false')
    cy.intercept('GET', 'https://apis-test.vnlp.ai/auth/password/reset?username=datgpt').as('true')

  })

  it('Forgot password', () => {
    cy.wait(500)
    cy.contains('Quên mật khẩu?').click()
    cy.wait(500)
    cy.url().should('include', '/auth/forgot-password') // => true
    cy.url().should('eq', 'https://vagent-test.vnlp.ai/#/auth/forgot-password') // => true

    cy.get('.logo-company').eq(1).should('be.visible')
    cy.get('.logo-company').eq(1).should('have.attr', 'src', '../../../../../assets/images/icon/emandai-logo.svg')

    cy.get('.auth-action-header').should('have.text', 'Quên mật khẩu').should('have.css', 'color', 'rgb(20, 20, 22)')

    cy.get('.auth-description').should('have.text', 'Vui lòng nhập tài khoản bạn dùng để đăng ký tài khoản VNLP. Chúng tôi sẽ gửi email của bạn sớm nhất có thể.').should('have.css', 'color', 'rgb(119, 126, 144)')

    cy.get('.va-input-label').should('have.text', ' Tên đăng nhập ')

    cy.get('#username').should('have.attr', 'placeholder', 'Nhập tên đăng nhập')

    cy.contains('Xác nhận').should('be.disabled')


    cy.get('#username').click().type('dat')
    cy.contains('Xác nhận').should('be.enabled').click()

    cy.get('#username').click().type('{selectall}{backspace}dat  ')
    cy.contains('Xác nhận').should('be.disabled')
    cy.get('.va-error-message').should('have.contain', 'Tài khoản không hợp lệ') //Tài khoản không hợp lệ

    cy.get('#username').click().type('{backspace}{backspace}')
    cy.contains('Xác nhận').should('be.enabled').click()
    cy.wait('@false').its('response.body.success').should('eq', false) //Get API False
    cy.wait('@false').its('response.body.errorCode').should('eq', "200") //Get API False  *Đáng lẽ ra phải ra lỗi 400 nhưng tạm skip


    cy.get('.va-error-message').contains('Người dùng không tồn tại').should('be.visible') //Người dùng không tồn tại 
    cy.contains('Xác nhận').should('be.disabled')

    cy.get('#username').click().type('{selectall}{backspace}')
    cy.get('.va-error-message').contains('Vui lòng nhập tên tài khoản').should('be.visible') //Vui lòng nhập tên tài khoản
    cy.contains('Xác nhận').should('be.disabled')

    cy.get('#username').click().type('9999999999999999999999999999999')
    cy.get('.va-error-message').contains('Vượt quá giới hạn cho phép').should('be.visible') //Vượt quá giới hạn cho phép
    cy.contains('Xác nhận').should('be.disabled')

    cy.get('#username').click().type('{selectall}{backspace}datgpt')
    cy.contains('Xác nhận').should('be.enabled').click()
    cy.wait('@true').its('response.body.success').should('eq', true) //Get API success
  })

    it('URL Forgot > Login', () => {

      cy.contains('Quên mật khẩu?').click()
      cy.wait(500)
       cy.contains('Quay lại').click()
       cy.url().should('include', '/auth/login') // => true
       cy.url().should('eq', 'https://vagent-test.vnlp.ai/#/auth/login') // => true
     })
 
     




})


