context('Login-Del-Update', () => {
  beforeEach(() => {

    cy.visit('https://va-test.vnlp.ai/')
    cy.intercept('GET', '/localizations').as('localizations')



    //cy.title().should('eq', 'sign_in - VNLP Virtual Agent')


  })

  // https://on.cypress.io/interacting-with-elements

  it('LOGIN EN', () => {


    //API
    cy.intercept('/auth/login').as('login')
    cy.get('.js-is-select', { timeout: 10000 }).click()
    cy.get(':nth-child(1) > a').click()

    cy.get('.img-responsive').should('be.visible')
    cy.get('.img-responsive').should('have.attr', 'src', '../../assets/images/logo/logo.png')

    cy.get('.js-moderate', { timeout: 10000 }).should('have.contain', 'EN')
    cy.get('h4').should('have.contain', 'Login')
    cy.get(':nth-child(1) > .text-uppercase').should('have.contain', 'Username')


    cy.get(':nth-child(2) > .text-uppercase').should('have.contain', 'Password')

    cy.wait(500)
    cy.get('form.ng-untouched').within(() => {
      cy.get('input:first').should('have.attr', 'placeholder', 'Username')
      //placeholder là chữ ẩn trong input 
      //Đang check ô Email
      cy.get('input:last').should('have.attr', 'placeholder', 'Password')
      cy.get('.btn').should('have.contain', 'Login')
    })

    cy.get('.mt-2 > .text-vnlp-1').should('have.contain', 'Forgot password?').should('have.css', 'color', 'rgb(255, 114, 1)')

    cy.get('.text-center.mt-3 > label').should('have.contain', 'You do not have an account?')
    cy.get('.text-center.mt-3 > .text-vnlp-1').should('have.contain', 'Register!').should('have.css', 'color', 'rgb(255, 114, 1)')

    //Color text: Fullname/Phone/Email/Orgname/.......
    cy.get('label').should('have.css', 'color', 'rgb(33, 33, 33)')
    cy.wait(500)
    //Check Button disabled
    cy.get('.btn').should('be.disabled')
    cy.get('#username').type('fake@email.com').should('have.value', 'fake@email.com')
    cy.get('.btn').should('be.disabled')
    cy.get('#password').type('123123')
    cy.get('.btn').should('be.enabled')

    cy.get('#username').click()
      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')
    cy.get('.btn').should('be.disabled')

    cy.get('#username').type('fake@email.com').should('have.value', 'fake@email.com')
    cy.get('.btn').click()
    cy.get('.error-validate').should('have.contain', 'Username or pasword is incorrect')
    cy.get('.error-validate')

      .should('have.css', 'color', 'rgb(250, 98, 75)')



    cy.wait(500)
    cy.get('#username').type('{del}{selectall}{backspace}')
      .type('fake@email.com').should('have.value', 'fake@email.com')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.3 sec
      .type('dat.do', { delay: 20 })
      .should('have.value', 'dat.do')

    cy.get('#password').type('{del}{selectall}{backspace}')
      .type('taonemay123').should('have.value', 'taonemay123')

    cy.get('.vnlp-icon').click()

    cy.get('.btn').eq(0).click()
    cy.wait('@login')
    cy.get('.new-content').click()
    cy.get('form.ng-untouched > :nth-child(1) > :nth-child(1) > .ng-untouched').type('Faker')
    cy.get(':nth-child(3) > .mb-3').type('Auto')

    cy.get('.btn-vnlp').eq(0).click()
    cy.get('.error-validate').should('have.contain', 'Name is existing')

    cy.get('form.ng-dirty > :nth-child(1) > :nth-child(1) > .ng-dirty').type('{del}{selectall}{backspace}')
    cy.get('.error-validate').should('have.contain', 'Name is required')


    //API
    cy.intercept('/bots').as('bot')

    cy.get('.p-dialog-header-close-icon').click()
    cy.get(':nth-child(2) > .bot-card > .action').click()
    cy.get(':nth-child(2) > .bot-card > .action > .action-icon > .js-dropdown > :nth-child(1) > a').click()
    cy.get('form.ng-valid > :nth-child(1) > :nth-child(1) > .ng-untouched').eq(0)
      .type('{del}{selectall}{backspace}', { delay: 50 })
      .type('Hide on Bush')
      .should('have.value', 'Hide on Bush')
    cy.get('.error-validate').should('have.contain', 'Name is existing')
    cy.wait(500)
    cy.get(':nth-child(3) > .mb-3')
      .type('{del}{selectall}{backspace}', { delay: 30 })
      .type('KOREAN_N/A')
      .should('have.value', 'KOREAN_N/A')

    cy.get('.btn-vnlp').eq(0).click() //Button

    //Noti Name exiested


    cy.get('.btn-common').eq(0).click()
    //API
    cy.intercept('/auth/login').as('login')
  })


  it('LOGIN VI', () => {


    //API
    cy.intercept('/auth/login').as('login')
    cy.get('.js-is-select', { timeout: 10000 }).click()
    cy.get(':nth-child(1) > a').click()

    cy.get('.img-responsive').should('be.visible')
    cy.get('.img-responsive').should('have.attr', 'src', '../../assets/images/logo/logo.png')

    cy.get('.js-moderate', { timeout: 10000 }).should('have.contain', 'EN')
    cy.get('h4').should('have.contain', 'Login')
    cy.get(':nth-child(1) > .text-uppercase').should('have.contain', 'Username')


    cy.get(':nth-child(2) > .text-uppercase').should('have.contain', 'Password')

    cy.wait(500)
    cy.get('form.ng-untouched').within(() => {
      cy.get('input:first').should('have.attr', 'placeholder', 'Username')
      //placeholder là chữ ẩn trong input 
      //Đang check ô Email
      cy.get('input:last').should('have.attr', 'placeholder', 'Password')
      cy.get('.btn').should('have.contain', 'Login')
    })

    cy.get('.mt-2 > .text-vnlp-1').should('have.contain', 'Forgot password?').should('have.css', 'color', 'rgb(255, 114, 1)')

    cy.get('.text-center.mt-3 > label').should('have.contain', 'You do not have an account?')
    cy.get('.text-center.mt-3 > .text-vnlp-1').should('have.contain', 'Register!').should('have.css', 'color', 'rgb(255, 114, 1)')

    //Color text: Fullname/Phone/Email/Orgname/.......
    cy.get('label').should('have.css', 'color', 'rgb(33, 33, 33)')
    cy.wait(500)
    //Check Button disabled
    cy.get('.btn').should('be.disabled')
    cy.get('#username').type('fake@email.com').should('have.value', 'fake@email.com')
    cy.get('.btn').should('be.disabled')
    cy.get('#password').type('123123')
    cy.get('.btn').should('be.enabled')

    cy.get('#username').click()
      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')
    cy.get('.btn').should('be.disabled')

    cy.get('#username').type('fake@email.com').should('have.value', 'fake@email.com')
    cy.get('.btn').click()
    cy.get('.error-validate').should('have.contain', 'Username or pasword is incorrect')
    cy.get('.error-validate')

      .should('have.css', 'color', 'rgb(250, 98, 75)')



    cy.wait(500)
    cy.get('#username').type('{del}{selectall}{backspace}')
      .type('fake@email.com').should('have.value', 'fake@email.com')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.3 sec
      .type('dat.do', { delay: 20 })
      .should('have.value', 'dat.do')

    cy.get('#password').type('{del}{selectall}{backspace}')
      .type('taonemay123').should('have.value', 'taonemay123')

    cy.get('.vnlp-icon').click()

    cy.get('.btn').eq(0).click()
    cy.wait('@login')
    cy.get('.new-content').click()
    cy.get('form.ng-untouched > :nth-child(1) > :nth-child(1) > .ng-untouched').type('Faker')
    cy.get(':nth-child(3) > .mb-3').type('Auto')

    cy.get('.btn-vnlp').eq(0).click()
    cy.get('.error-validate').should('have.contain', 'Name is existing')

    cy.get('form.ng-dirty > :nth-child(1) > :nth-child(1) > .ng-dirty').type('{del}{selectall}{backspace}')
    cy.get('.error-validate').should('have.contain', 'Name is required')


    //API
    cy.intercept('/bots').as('bot')

    cy.get('.p-dialog-header-close-icon').click()
    cy.get(':nth-child(2) > .bot-card > .action').click()
    cy.get(':nth-child(2) > .bot-card > .action > .action-icon > .js-dropdown > :nth-child(1) > a').click()
    cy.get('form.ng-valid > :nth-child(1) > :nth-child(1) > .ng-untouched').eq(0)
      .type('{del}{selectall}{backspace}', { delay: 50 })
      .type('Hide on Bush')
      .should('have.value', 'Hide on Bush')
      cy.get('.error-validate').should('have.contain', 'Name is existing')
    cy.wait(500)
    cy.get(':nth-child(3) > .mb-3')
      .type('{del}{selectall}{backspace}', { delay: 30 })
      .type('KOREAN_N/A')
      .should('have.value', 'KOREAN_N/A')

    cy.get('.btn-vnlp').eq(0).click() //Button

    //Noti Name exiested


    cy.get('.btn-common').eq(0).click()
    //API
    cy.intercept('/auth/login').as('login')



  })

})

