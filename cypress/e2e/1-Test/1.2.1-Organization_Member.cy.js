/**

*My organization
  - Check fil Org name khi xóa input thì Button Save disabled(Ẩn không cho click), 
    hiển thị thông báo lỗi name_required.
    + Fil ký tự đặc biệt vào > Button Save disabled, xuất hiện thông báo wrong_pattern.
    + Fil ký tự thường > Button Save Enabled, mất thông báo lỗi.

  - Fil "Description" không yêu cầu bắt buộc nên input hay empty thì cũng k ảnh hưởng.

  - Fil "Email" cũng không bắt buộc, NHƯNG nếu đã fil thì fill cho đúng "....@gmai.com""
    + Trường hợp nhập sai > Button Save disabled, xuất hiện thông báo Invalid email.
    + Trường hợp nhập đúng >  Button Save Enabled, mất thông báo lỗi.

  - Fill "Phone Number" cũng không yêu cầu bắt buộc, Nhưng nếu đã fil thì đúng định dạng là SỐ, không fill chữ.
    + Trường hợp nhập sai > Button Save disabled, xuất hiện thông báo Invalid phone.
    + Trường hợp nhập đúng >  Button Save Enabled, mất thông báo lỗi.

  - Fill "Address" không yêu cầu bắt buộc nên input hay empty thì cũng k ảnh hưởng.

  - Check thông báo khi bấm Save > NotificationUpdate successfully

*Check Language EN - VI
  -
**/
context('Organization_Member', () => {
  beforeEach(() => {

    cy.visit('https://va-test.vnlp.ai/')

  })

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
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
cy.wait(1500)
    cy.get(':nth-child(3) > .js-is-select').click()
    cy.get(':nth-child(3) > .js-dropdown > .ng-star-inserted > a').click()
   cy.wait(1000)
    //Chuyển EN
    cy.contains(' EN ', { timeout: 5000 }).click()
    cy.wait(1000)
    cy.contains('English',{ timeout: 10000 }).click()
    cy.wait(1000)
    cy.contains(' Members ',{ timeout: 10000 }).click()
    cy.wait(1000)
    cy.get('li.ng-star-inserted')
      .first()
      .should('have.contain', ' Information ')
      .next()
      .should('have.contain', 'Members')
      .next()
      .should('have.contain', ' Departments ')
      .next()
      .should('have.contain', ' Settings ')

    cy.get('.table-header-main > .ng-star-inserted > .btn')
      .should($el => { expect($el[0].textContent).to.contain('invite') })
    cy.get('.table-header-main > .ng-star-inserted > .btn').click()
    cy.get('.p-dialog-header').should('have.contain', 'Invite member')
    cy.get('.note-title').eq(2).should('have.text', 'Email')
    cy.get('.ng-star-inserted > .ng-untouched').eq(0).should('have.attr', 'placeholder', 'Email')
    cy.get('.note-title').eq(3).should('have.text', 'Roles')
    cy.get('.p-dropdown-label').should('have.contain', 'Select role')

    cy.get('.p-dropdown-label').click()
    cy.get('ul.p-dropdown-items')
    //cy.get('[role="listbox"]')
    //cy.get('.p-dropdown-items-wrapper')
      .find('li').should('have.length', 5)

  
    cy.get('p-dropdownitem',{ timeout: 10000 })
      .first()
      .should('have.contain', 'select_role')
      .next()
      .should('have.contain', 'Basic')
      .next()
      .should('have.contain', 'Bot Viewer')
      .next()
      .should('have.contain', 'PhuongTM Test')
      .next()
      .should('have.contain', 'VA Admin')
cy.wait(1000)
    cy.get('.p-dropdown-filter',{ timeout: 10000 }).focus().type('b')
    cy.get('p-dropdownitem',{ timeout: 10000 })
      .first()
      .should('have.contain', 'Basic')
      .next()
      .should('have.contain', 'Bot Viewer')
    cy.get('.p-dropdown-items-wrapper')
      .find('ul').find('li').should('have.length', 2)

    //Check search p = PhuongTM Test
 
    cy.get('input[type="text"][autocomplete="off"]').click().type('{del}{selectall}{backspace}p')
    //cy.get('.p-dropdown-filter').click()
    cy.get('p-dropdownitem')
      .first()
      .should('have.contain', 'PhuongTM Test')
    cy.get('.p-dropdown-items-wrapper')
      .find('ul').find('li').should('have.length', 1)

    cy.get('.p-dropdown-filter').click().type('{del}{selectall}{backspace}va')
    cy.get('p-dropdownitem')
      .first()
      .should('have.contain', 'VA Admin')
    cy.get('.p-dropdown-items-wrapper')
      .find('ul').find('li').should('have.length', 1)

    cy.get('.p-dropdown-filter').click().type('{del}{selectall}{backspace}2')
    cy.get('.p-dropdown-empty-message')
      .first()
      .should('have.contain', 'No Results Found')
    cy.get('.p-dropdown-items-wrapper')
      .find('ul').find('li').should('have.length', 1)

    cy.get('.p-dropdown-filter').click().type('{del}{selectall}{backspace}z')
    cy.get('.p-dropdown-empty-message')
      .first()
      .should('have.contain', 'No Results Found')
    cy.get('.p-dropdown-items-wrapper')
      .find('ul').find('li').should('have.length', 1)

    cy.get('.p-dropdown-filter').click().type('{del}{selectall}{backspace}q')
    cy.get('.p-dropdown-empty-message')
      .first()
      .should('have.contain', 'No Results Found')
    cy.get('.p-dropdown-items-wrapper')
      .find('ul').find('li').should('have.length', 1)

    cy.get('.p-dropdown-filter').click().type('{del}{selectall}{backspace}@')
    cy.get('.p-dropdown-empty-message')
      .first()
      .should('have.contain', 'No Results Found')
    cy.get('.p-dropdown-items-wrapper')
      .find('ul').find('li').should('have.length', 1)

    cy.get('.p-dropdown-filter').click().type('{del}{selectall}{backspace}*')
    cy.get('.p-dropdown-empty-message')
      .first()
      .should('have.contain', 'No Results Found')
    cy.get('.p-dropdown-items-wrapper')
      .find('ul').find('li').should('have.length', 1)

    cy.get('.p-dropdown-filter').click().type('{del}{selectall}{backspace}')
    cy.get('.p-dropdown-items-wrapper')
      .find('ul').find('li').should('have.length', 5)

    cy.contains('Invite member').click({ force: true })
    cy.get('.btn-common').should($el => { expect($el[0].textContent).to.contain('Cancel') })
    cy.get('.btn-vnlp').should($el => { expect($el[0].textContent).to.contain('Save') })
    cy.get('.btn-vnlp').eq(3).click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationEmail Invalid");
        //Check noti when save successfully
      })
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()

    cy.get('input[placeholder="Email"]').click()
      .type('0123123').should('have.value', '0123123')
    cy.get('.btn-vnlp').eq(3).click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationEmail Invalid");
        //Check noti when save successfully
      })
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()

    cy.get('input[placeholder="Email"]').click().type('{del}{selectall}{backspace}asd@gmail.com')
    cy.get('.btn-vnlp').eq(3).click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationRole is required");
        //Check noti when save successfully
      })
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()

    cy.get('input[placeholder="Email"]').click().type('{del}{selectall}{backspace}')
    cy.get('.btn-vnlp').eq(3).click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationEmail Invalid");
        //Check noti when save successfully
      })
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()

    cy.get('input[placeholder="Email"]').click().type('{del}{selectall}{backspace}asd@gmail.com')
    cy.get('.btn-vnlp').eq(3).click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationRole is required");
        //Check noti when save successfully
      })
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()

    cy.get('.p-dropdown-label').click()
    cy.get(':nth-child(2) > .p-dropdown-item').click()
    cy.get('.btn-vnlp').eq(3).click()
    cy.get('.p-toast-message-content').invoke('text')
      .then((text) => {
        const toastText = text;
        expect(toastText).to.equal("NotificationThe email has been sent");
        //Check noti when save successfully
      })
    //Tắt nút X khi thông báo Successfully
    cy.get('.p-toast-icon-close-icon').click()

    cy.get('.table-header-main > .ng-star-inserted > .btn').click()
    cy.get('.btn-common').should('be.enabled')
    cy.get('.btn-common').click()

    cy.get('.table-header-main > .ng-star-inserted > .btn').click()
    cy.get('.p-dialog-header-close-icon').click()





  })
})