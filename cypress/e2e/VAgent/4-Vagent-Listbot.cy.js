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
        cy.get('h3').contains('🎉 Xin chào, Đỗ Quốc Đạt').should('be.visible')


        cy.get('.menu-top--end.items-center.flex.gap-5.h-full span').eq(0).should('have.contain', 'License')
        cy.get('.menu-top--end.items-center.flex.gap-5.h-full span').eq(1).should('have.text', ' Đối tác ')
        cy.get('.menu-top--end.items-center.flex.gap-5.h-full span').eq(2).should('have.contain', 'Phản hồi')
        cy.get('.menu-top--end.items-center.flex.gap-5.h-full span').eq(3).should('have.contain', 'Hỗ trợ')
        cy.get('.menu-top--end.items-center.flex.gap-5.h-full span').eq(4).should('have.contain', 'VIE')
        cy.get('i.va-icon.vie-flag-icon').should('be.visible')



        cy.get('.relative.cursor-pointer').click()
        cy.get('.user-info-panel-container')




        cy.get('ul.border-solid.border-stroke')   //cy.get('[role="listbox"]')    //cy.get('.p-dropdown-items-wrapper')
            .find('i').should('have.length', 4)
        cy.get('i.icon-vnlp-icon-user-octagon-linear.text-md.mr-3').should('be.visible')
        cy.get('i.icon-vnlp-icon-receipt-2-1-linear.text-md.mr-3').should('be.visible')
        cy.get('i.icon-vnlp-icon-lock-linear.text-md.mr-3').should('be.visible')
        cy.get('i.icon-vnlp-icon-discount-shape-linear.mr-3').should('be.visible')


        cy.get('ul.border-solid.border-stroke')   //cy.get('[role="listbox"]')    //cy.get('.p-dropdown-items-wrapper')
            .find('li').should('have.length', 4)
        cy.get('li.mb-4', { timeout: 10000 })
            .first()
            .should('have.contain', ' Hồ sơ cá nhân ')
            .next()
            .should('have.contain', ' Giao dịch ')
            .next()
            .should('have.contain', ' Đổi mật khẩu ')
            .next()
            .should('have.contain', ' Hồ sơ đối tác ')

        cy.get('li.mb-4', { timeout: 10000 })



    })

    it('URL Profile > Hồ sơ cá nhân', () => {
        cy.get('.relative.cursor-pointer').click()
        cy.wait(500)
        cy.contains('Hồ sơ cá nhân').click()
        cy.url().should('include', '/account/profile') // => true
        cy.url().should('eq', 'https://vagent-test.vnlp.ai/#/account/profile') // => true  
    })

    it('URL Profile > Giao dịch', () => {
        cy.get('.relative.cursor-pointer').click()
        cy.wait(500)
        cy.contains('Giao dịch').click()
        cy.url().should('include', '/account/transaction') // => true
        cy.url().should('eq', 'https://vagent-test.vnlp.ai/#/account/transaction') // => true  
    })

    it('URL Profile > Đổi mật khẩu', () => {
        cy.get('.relative.cursor-pointer').click()
        cy.wait(500)
        cy.contains('Đổi mật khẩu').click()
        cy.url().should('include', '/account/change-password') // => true
        cy.url().should('eq', 'https://vagent-test.vnlp.ai/#/account/change-password') // => true  
    })
    it('URL Profile > Trở thành đối tác', () => {
        cy.get('.relative.cursor-pointer').click()
        cy.wait(500)
        cy.contains('Trở thành đối tác').click()
        cy.get('.custom-vnlp-modal.p-dialog.p-component.ng-star-inserted').should('be.visible')

    })

}) 
