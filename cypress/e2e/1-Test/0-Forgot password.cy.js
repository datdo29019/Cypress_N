context('Login-Del-Update', () => {
        beforeEach(() => {

                cy.visit('https://va-test.vnlp.ai/')
                cy.intercept('GET', '/localizations').as('localizations')
                cy.intercept('GET', 'https://apis-test.vnlp.ai/auth/password/reset?username=dat.do').as('true')
                cy.intercept('GET', 'https://apis-test.vnlp.ai/auth/password/reset?username=12345').as('false')


                cy.wait(1000)
                //cy.wait('@localizations')
                //  cy.title().should('eq', 'sign-in - VNLP Virtual Agent')//Title

                cy.url().should('include', '/login') // => true
                cy.url().should('eq', 'https://va-test.vnlp.ai/#/login?returnUrl=%2Fbots') // => true

        })

        // https://on.cypress.io/interacting-with-elements

        it('hover', () => {
                cy.get('#username').trigger('mouseover')
                cy.get('#username').should('have.css', 'background-color', 'rgb(250, 250, 250)')//hover #333

                cy.get('.mt-2 > .text-vnlp-1').click()
                cy.url().should('include', '/forgot-password') // => trủe

                cy.get('.img-responsive').should('be.visible')
                cy.get('.img-responsive').should('have.attr', 'src', '../../assets/images/logo/logo.png')


                cy.get('.change-language').click()
                cy.get('ul li a').should('contain', 'English').should('contain', 'Tiếng Việt')
                cy.contains('English').click()
                //Localizations //Color //Backgr.... EN
                cy.get('h4').should('contain', 'Forgot password')
                        .should('have.css', 'color', 'rgb(33, 33, 33)')

                cy.get('p').should('contain', 'Please enter your account used to sign up VNLP account. We will send your email as soon as possible')
                        .should('have.css', 'color', 'rgba(0, 0, 0, 0.5)')
                cy.get('label').should('contain', 'Username')
                        .should('have.css', 'color', 'rgb(33, 33, 33)')

                cy.get('#username').should('have.attr', 'placeholder', 'Username')
                cy.get('.button-submit').should('contain', 'Confirm')
                cy.get('.btn-vnlp').should('have.css', 'background', 'linear-gradient(256deg, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)) repeat scroll 0% 0% / auto padding-box border-box, rgba(0, 0, 0, 0) linear-gradient(rgb(255, 114, 1), rgb(255, 114, 1)) repeat scroll 0% 0% / auto padding-box border-box')
                        .should('have.css', 'color', 'rgb(255, 255, 255)') //Color text in button Submit
                cy.contains('Back').should('have.contain', 'Back').should('have.css', 'color', 'rgb(255, 114, 1)') //Back

                //Input username required
                cy.get('.button-submit').click()
                cy.get('.p-toast-message-content').invoke('text')
                        .then((text) => {
                                const toastText = text;
                                expect(toastText).to.equal("NotificationInput username required");
                        })
                //Del X
                cy.get('.p-toast-icon-close-icon').click()
                cy.wait(1000)
                //User is not found
                cy.get('#username').click().type('123456789{del}{selectall}{backspace}12345')
                cy.get('.button-submit').click()
                cy.get('.p-toast-message-content').invoke('text')
                        .then((text) => {
                                const toastText = text;
                                expect(toastText).to.equal("NotificationUser is not found");
                        })

                cy.wait('@false').its('response.body.success').should('eq', false)
                //Del X
                cy.get('.p-toast-icon-close-icon').click()

                cy.wait(1000)


                //Email has been sent
                cy.get('#username').click().type('{selectall}{del}dat.do')
                cy.get('.button-submit').click()
                cy.get('.p-toast-message-content').invoke('text')
                        .then((text) => {
                                const toastText = text;
                                expect(toastText).to.equal("NotificationEmail has been sent");
                        })
                cy.wait('@true').its('response.body.success').should('eq', true)
                //Del X
                cy.get('.p-toast-icon-close-icon').click()


                cy.wait(1000)
                cy.get('.change-language').click()
                cy.get('ul li a').should('contain', 'English').should('contain', 'Tiếng Việt')
                cy.contains('Tiếng Việt').click()
                //Localizations //Color //Backgr.... VI
                cy.get('h4').should('contain', 'Quên mật khẩu')
                        .should('have.css', 'color', 'rgb(33, 33, 33)')

                cy.get('p').should('contain', 'Nhập tài khoản bạn đã sử dụng để đăng kí hệ thống VNLP. Chúng tôi sẽ gửi đến email của bạn đường dẫn tạo mới mật khẩu')
                        .should('have.css', 'color', 'rgba(0, 0, 0, 0.5)')
                cy.get('label').should('contain', 'Tài khoản')
                        .should('have.css', 'color', 'rgb(33, 33, 33)')

                cy.get('#username').should('have.attr', 'placeholder', 'Tài khoản')
                cy.get('.button-submit').should('contain', 'Xác nhận')
                cy.get('.btn-vnlp').should('have.css', 'background', 'linear-gradient(256deg, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)) repeat scroll 0% 0% / auto padding-box border-box, rgba(0, 0, 0, 0) linear-gradient(rgb(255, 114, 1), rgb(255, 114, 1)) repeat scroll 0% 0% / auto padding-box border-box')
                        .should('have.css', 'color', 'rgb(255, 255, 255)') //Color text in button Submit
                cy.contains('Quay lại').should('have.contain', 'Quay lại').should('have.css', 'color', 'rgb(255, 114, 1)') //Back

                cy.wait(1000)
                //Input username required
                cy.get('#username').click().type('{selectall}{del}')
                cy.get('.button-submit').click()
                cy.get('.p-toast-message-content').invoke('text')
                        .then((text) => {
                                const toastText = text;
                                expect(toastText).to.equal("Thông báoVui lòng nhập tên người dùng");
                        })
                //Del X
                cy.get('.p-toast-icon-close-icon').click()
                cy.wait(1000)
                //User is not found
                cy.get('#username').click().type('123456789{del}{selectall}{backspace}12345')
                cy.get('.button-submit').click()
                cy.get('.p-toast-message-content').invoke('text')
                        .then((text) => {
                                const toastText = text;
                                expect(toastText).to.equal("Thông báoNgười dùng không tồn tại");
                        })

                cy.wait('@false').its('response.body.success').should('eq', false)


                //Del X
                cy.get('.p-toast-icon-close-icon').click()

                cy.wait(1000)

                //Email has been sent
                cy.get('#username').click().type('{selectall}{del}dat.do')
                cy.get('.button-submit').click()
                cy.get('.p-toast-message-content').invoke('text')
                        .then((text) => {
                                const toastText = text;
                                expect(toastText).to.equal("Thông báoĐã gửi email");
                        })

                cy.wait('@true').its('response.body.success').should('eq', true)
                //Del X
                cy.get('.p-toast-icon-close-icon').click()

                //Comeback Lgin
                cy.contains('Quay lại').click()
                cy.wait(1000)
                cy.url().should('include', '/login') // => true


        })
})

