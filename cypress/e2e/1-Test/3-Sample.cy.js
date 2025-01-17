context('Samples', () => {
  beforeEach(() => {

    cy.visit('https://va-test.vnlp.ai/')

  })

  // https://on.cypress.io/interacting-with-elements

  it('Create - Search samples', () => {
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

    //Get Home
    cy.contains('Faker').click()
    cy.wait(3500)
		cy.contains('Build Bots', { timeout: 10000 }).click() //Open Conversations
    cy.wait(1000)
    cy.contains('Sample Inputs', { timeout: 7000 }).click()

    cy.get('.btn-vnlp').click()
    cy.get(':nth-child(1) > .ng-pristine > .p-dropdown > .p-dropdown-label').click()
    cy.get(':nth-child(1) > .ng-pristine > .p-dropdown > .p-dropdown-label').click()


    //Check khi không chọn Intent
    cy.get('#autoSuggestion')
      .type('Faker').should($el => {
        expect($el[0].textContent).to.contain('Faker')
      })

    cy.get('.btn-vnlp')
      .then(ele => {
        ele[1].click() //Click cái thứ 2 Ele1 là từ 0-1
      })

    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationPlease select an intent");
        //Check noti when save successfully
      })

    //Tắt nút X khi thông báo Fail
    cy.get('.p-toast-icon-close-icon').click()
    //Trường hợp đúng khi input text + Choose Intent
    cy.get(':nth-child(1) > .ng-pristine > .p-dropdown > .p-dropdown-label').click()

    cy.get(':nth-child(1) > .p-dropdown-item').click()

    cy.get('.btn-vnlp')
      .then(ele => {
        ele[1].click() //Click cái thứ 2 Ele1 là từ 0-1
      })
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationSaved successfully");
        //Check noti when save successfully
      })


    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()
    //Check Duplicate Sample (Sample đã có)
    cy.get('#autoSuggestion')
      .type('Faker').should($el => {
        expect($el[0].textContent).to.contain('Faker')
      })


    cy.get('.btn-vnlp')
      .then(ele => {
        ele[1].click() //Click cái thứ 2 Ele1 là từ 0-1
      })
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationCONTENT_SAMPLE_INPUT_DUPLICATE");
        //Check noti when save successfully
      })
    //Tắt nút X khi thông báo Fail
    cy.get('.p-toast-icon-close-icon').click()

    //Add Samples
    cy.get('#autoSuggestion')
      .type('Faker1').should($el => {
        expect($el[0].textContent).to.contain('Faker1')
      })

    cy.get('.btn-vnlp')
      .then(ele => {
        ele[1].click() //Click cái thứ 2 Ele1 là từ 0-1
      })
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationSaved successfully");
        //Check noti when save successfully
      })
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()


    //
    cy.get('.btn-common').click()
    cy.wait(800)
    cy.get('p-tableheadercheckbox > .p-checkbox > .p-checkbox-box', { timeout: 10000 }).click()
    cy.get('.table-header-main > div.ng-star-inserted > :nth-child(3)')
      .invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal(" All 5 sample sentences on this page have been selected Choose all 5 Sample Inputs");
        //Check Text show
      })

    cy.get('p-tableheadercheckbox > .p-checkbox > .p-checkbox-box > .p-checkbox-icon').click()
    cy.get('.p-dropdown-label').click()
    cy.get(':nth-child(2) > .p-dropdown-item').click()
    cy.wait('@sample')
    cy.wait(2500)
    cy.get('.p-paginator-current', { timeout: 10000 })
      .invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("Showing 1 to 4 of 4 entries");
        //Check Text show
      })


    cy.get('.p-dropdown-label').click()
    cy.get(':nth-child(3) > .p-dropdown-item').click()
    cy.wait('@sample')
    cy.wait(2500)
    cy.get('.p-paginator-current')
      .invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("Showing 1 to 1 of 1 entries");
        //Check Text show
      })


    cy.get('.p-dropdown-label').click()
    cy.get(':nth-child(1) > .p-dropdown-item').click()
    cy.wait('@sample')
    cy.wait(2500)
    cy.get('.p-paginator-current')
      .invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("Showing 1 to 5 of 5 entries");
        //Check Text show
      })


    cy.get('.input-search > input').focus()
      .type('Faker').should('have.value', 'Faker')


    cy.wait(2500)
    cy.get('.p-paginator-current')
      .invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("Showing 1 to 2 of 2 entries");
        //Check Text show
      })

    cy.get('.input-search > input').focus()
      .type('{del}{selectall}{backspace}')
      .type('Faker1').should('have.value', 'Faker1')


    cy.wait(2500)
    cy.get('.p-paginator-current')
      .invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("Showing 1 to 1 of 1 entries");
        //Check Text show
      })

    cy.get('.input-search > input').focus()
      .type('{del}{selectall}{backspace}')
      .type('123').should('have.value', '123')

    cy.wait(2500)
    cy.get('.p-paginator-current')
      .invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("Showing 1 to 3 of 3 entries");
        //Check Text show
      })

    cy.get('.input-search > input').focus()
      .type('{del}{selectall}{backspace}')


    cy.wait(2500)
    cy.get('.p-paginator-current')
      .invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("Showing 1 to 5 of 5 entries");
        //Check Text show
      })

  })
  it('Del - Del all samples', () => {
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
    cy.contains('Faker').click()
    cy.wait(3500)
    cy.contains('Build Bots', { timeout: 10000 }).click() //Open Conversations
    cy.wait(1000)
    cy.contains('Sample Inputs', { timeout: 7000 }).click()

    cy.get('.table-quick-action > .ng-star-inserted > .vnlp-icon').eq(0).click()
    cy.wait(300)
    cy.contains('OK').click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationDeleted successfully");
      })
    //Check noti when save successfully
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()
    cy.wait('@true').its('response.body.success').should('eq', true)



    cy.get('p-tableheadercheckbox > .p-checkbox > .p-checkbox-box').click()
    cy.contains(' Delete ').click()
    cy.contains('OK').click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationDeleted successfully");
      })
    //Check noti when save successfully
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()
    cy.wait('@true').its('response.body.success').should('eq', true)
    cy.wait('@true').its('response.body.recordsTotal').should('eq', 0)
  })

  
})