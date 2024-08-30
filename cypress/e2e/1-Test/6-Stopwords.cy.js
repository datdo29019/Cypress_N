context('Stopwords', () => {
  beforeEach(() => {

    cy.visit('https://va-test.vnlp.ai/')

  })

  // https://on.cypress.io/interacting-with-elements

  it('Check validate Stop Words', () => {
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
    //Get Home
    cy.contains('Faker').click()

    //API
    cy.intercept('/bots').as('bot')
    cy.wait(1500)
    cy.contains('Build Bots').click() //Open Conversations

    cy.contains('Stop Words').click()

    cy.get('.p-inputtext')
      .type('ừ').type('{enter}')
      .type('ừ').type('{enter}')  //Check xem trùng lặp 2 a được k

      .type('à').type('{enter}')
      .type('à').type('{enter}') //Check xem trùng lặp 2 aa được k

      .type('ời').type('{enter}')
      .type('ời').type('{enter}')  //Check xem trùng lặp 2 End được k
      .should($el => {
        expect($el[0].textContent).to.contain('ừàời')
      })

    cy.get('.p-toast-icon-close-icon').click()
    cy.get('.text-left > .btn').click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationUpdate Success");
        //Check noti when save successfully
      })
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()


    cy.get(':nth-child(1) > .p-chips-token-icon').click()
    cy.contains('ừ').should('not.exist') //Khi xóa từ "ừ" đảm bảo không còn tồn tại

    cy.get(':nth-child(1) > .p-chips-token-icon').click()
    cy.contains('à').should('not.exist') //Khi xóa từ "à" đảm bảo không còn tồn tại

    cy.get(':nth-child(1) > .p-chips-token-icon').click()
    cy.contains('ời').should('not.exist') //Khi xóa từ "ời" đảm bảo không còn tồn tại


    cy.get('.text-left > .btn').click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationUpdate Success");
        //Check noti when save successfully
      })
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()


    cy.get('.p-inputtext')
      .should($el => {
        expect($el[0].textContent).to.contain('')
      })
    cy.get('.text-left > .btn').click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationUpdate Success");
        //Check noti when save successfully
      })
  })



  it('EN - VI ', () => {
    cy.get('#username')
      .type('dat.do')
      .should('have.value', 'dat.do')

    cy.get('#password')
      .type('taonemay123').should('have.value', 'taonemay123')

    cy.get('.btn').click()
    cy.get(':nth-child(2) > .bot-card > .bot-card--main').click()
    cy.wait(5500)
    cy.get(':nth-child(3) > .js-panel-title').click() //Open Conversations
    cy.wait(1500)
    cy.contains('Stop Words').click()

    cy.get(':nth-child(2) > .js-is-select').click()
    cy.get('.js-dropdown > :nth-child(1) > a').click()

    //Check Text EN  
    cy.get('.m-0').should('have.contain', 'Stop Words')
    cy.get('.note-title').should($el => { expect($el[0].textContent).to.contain('Home / Conversations / Stop Words ') })
    cy.get('.text-left > .btn').should($el => { expect($el[0].textContent).to.contain('Save') })

    //Check Text VI
    cy.get(':nth-child(2) > .js-is-select').click()
    cy.get('.js-dropdown > :nth-child(2) > a').click()
    cy.get('.m-0').should('have.contain', 'Stop Words')
    cy.get('.note-title').should($el => { expect($el[0].textContent).to.contain('Trang chủ / Hội thoại / Stop Words ') })
    cy.get('.text-left > .btn').should($el => { expect($el[0].textContent).to.contain('Lưu') })


    //Trả lại trạng thái EN
    cy.get(':nth-child(2) > .js-is-select').click()
    cy.get('.js-dropdown > :nth-child(1) > a').click()
  })

})
