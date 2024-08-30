context('Register', () => {
  beforeEach(() => {

    cy.visit('https://va-test.vnlp.ai/')
    cy.intercept('GET', '/localizations').as('localizations')



    cy.wait(1000)
    //cy.wait('@localizations')
    //cy.title().should('eq', 'sign-in - VNLP Virtual Agent')//Title

    cy.url().should('include', '/login') // => true
    cy.url().should('eq', 'https://va-test.vnlp.ai/#/login?returnUrl=%2Fbots') // => true

  })

  // https://on.cypress.io/interacting-with-elements

  it('Register EN', () => {
    cy.wait(1000)
    cy.contains('Đăng ký!').click()
    cy.url().should('include', '/register') // => trủe
    cy.url().should('eq', 'https://va-test.vnlp.ai/#/users/register') // => true

    cy.get('.img-responsive').should('be.visible')
    cy.get('.img-responsive').should('have.attr', 'src', '../../../assets/images/logo/logo.png')

    cy.get('.change-language').click()
    cy.get('ul li a').should('contain', 'English').should('contain', 'Tiếng Việt')
    cy.contains('English').click()

    //Localizations //Color //Backgr.... EN
    cy.get('.img-responsive').should('be.visible')
    cy.get('.img-responsive').should('have.attr', 'src', '../../../assets/images/logo/logo.png')

    cy.get('h4').should('contain', 'Register').should('have.css', 'color', 'rgb(33, 33, 33)')

    cy.wait(500)
    cy.get('label').eq(0).should('contain', 'Full name')
    cy.get('span').eq(0).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(0).should('be.enabled')

    cy.get('label').eq(1).should('contain', 'Phone number')
    cy.get('span').eq(1).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(1).should('be.enabled')

    cy.wait(500)
    cy.get('label').eq(2).should('contain', 'Email')
    cy.get('span').eq(2).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(2).should('be.enabled')

    cy.get('label').eq(3).should('contain', 'Address')
    cy.get('input').eq(3).should('be.enabled')

    cy.get('label').eq(4).should('contain', 'Organization')
    cy.get('input').eq(4).should('be.enabled')

    cy.wait(500)
    cy.get('label').eq(5).should('contain', 'Username')
    cy.get('span').eq(3).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(5).should('be.enabled')

    cy.get('label').eq(6).should('contain', 'Password')
    cy.get('span').eq(4).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(6).should('be.enabled')

    cy.wait(500)
    cy.get('label').eq(7).should('contain', 'Confirm password')
    cy.get('span').eq(5).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(7).should('be.enabled')

    cy.get('button').should('contain', 'Register')
      .should('have.css', 'background', 'linear-gradient(256deg, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)) repeat scroll 0% 0% / auto padding-box border-box, rgba(0, 0, 0, 0) linear-gradient(rgb(255, 114, 1), rgb(255, 114, 1)) repeat scroll 0% 0% / auto padding-box border-box')
      .should('have.css', 'color', 'rgb(255, 255, 255)') //Color text in button Submit

    cy.wait(500)
    cy.get('label').eq(8).should('contain', 'You have already account?')
    cy.contains('Log in').should('contain', 'Log in').should('have.css', 'color', 'rgb(255, 114, 1)')

    //Color text: Fullname/Phone/Email/Orgname/.......
    cy.get('label').should('have.css', 'color', 'rgb(33, 33, 33)')


    //Logic
    cy.get('.btn').click()
    cy.get('input').eq(0).should('be.enabled').should('have.css', 'border', '1px solid rgb(255, 0, 0)')//Fullname
    cy.get('input').eq(1).should('be.enabled').should('have.css', 'border', '1px solid rgb(255, 0, 0)')//PhoneNumber
    cy.get('input').eq(2).should('be.enabled').should('have.css', 'border', '1px solid rgb(255, 0, 0)')//Email
    //Address  //Orgname No required
    cy.get('input').eq(5).should('be.enabled').should('have.css', 'border', '1px solid rgb(255, 0, 0)')//Username
    cy.get('input').eq(6).should('be.enabled').should('have.css', 'border', '1px solid rgb(255, 0, 0)')//Password

    cy.wait(500)
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Full name is required')//Fullname
    cy.get('.error-validate.ng-star-inserted').eq(1).should('contain', 'Phone number is required')//PhoneNumber
    cy.get('.error-validate.ng-star-inserted').eq(2).should('contain', 'Email is required')//Email
    //Address  //Orgname No required
    cy.get('.error-validate.ng-star-inserted').eq(3).should('contain', 'Please enter username')//Username
    cy.get('.error-validate.ng-star-inserted').eq(4).should('contain', 'Please enter password')//Password

    cy.get('.error-validate.ng-star-inserted').should('have.css', 'color', 'rgb(250, 98, 75)')//Color

    cy.wait(500)
    cy.get('input').eq(0).type('!#$%^')//Validate character special
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Full name is invalid')
    cy.get('input').eq(0).type('{selectall}{backspace}')//Empty
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Full name is required')
    cy.get('input').eq(0).type('220597')//Validate Number
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Full name is invalid')
    cy.get('input').eq(0).type('{selectall}{backspace}Đỗ Quốc Đạt')//Not.exist Notications
    cy.contains('Full name is invalid').should('not.exist')

    cy.get('input').eq(1).type('!#$%^')//Validate character special
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Phone number is invalid')
    cy.get('input').eq(1).type('{selectall}{backspace}')//Empty
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Phone number is required')
    cy.get('input').eq(1).type('Hahaahaa')//Validate Text
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Phone number is invalid')
    cy.get('input').eq(1).type('{selectall}{backspace}0789905497     ')//Space
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Phone number is invalid')
    cy.get('input').eq(1).type('{selectall}{backspace}0769632239', { delay: 50 })//Not.exist Notications
    cy.contains('Phone number is invalid').should('not.exist')

    cy.wait(500)
    cy.get('input').eq(2).type('!#$%^')//Validate character special
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Email is invalid')
    cy.get('input').eq(2).type('{selectall}{backspace}')//Empty
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Email is required')
    cy.get('input').eq(2).type('doquocdat2205')//Validate Text
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Email is invalid')
    cy.get('input').eq(2).type('{selectall}{backspace}phamthuthao0906@gmail.com     ', { delay: 50 })//Space
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Email is invalid')
    cy.get('input').eq(2).type('{selectall}{backspace}doquocdat2205@gmail.com', { delay: 50 })//Not.exist Notications
    cy.contains('Email is invalid').should('not.exist')

    cy.wait(500)
    cy.get('input').eq(5).type('!#$%^')//Validate character special
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Username is invalid')
    cy.get('input').eq(5).type('{selectall}{backspace}')//Empty
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Please enter username')
    cy.get('input').eq(5).type('á à ả')//Validate Text
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Username is invalid')
    cy.get('input').eq(5).type('{selectall}{backspace}Space     ')//Space
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Username is invalid')
    cy.get('input').eq(5).type('{selectall}{backspace}dat.do')//Not.exist Notications
    cy.contains('Username is invalid').should('not.exist')

    cy.wait(500)
    cy.get('input').eq(6).type('DD   ')//Validate character special
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Enter at least 6 characters')
    cy.get('input').eq(6).type('{selectall}{backspace}')//Empty
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Please enter password')
    cy.get('input').eq(6).type('220597')//Not.exist Notications
    cy.contains('Please enter password').should('not.exist')

    cy.get('.btn').click()
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Confirm password is not matched')
    cy.get('input').eq(7).type('220597')
    cy.contains('Confirm password is not matched').should('not.exist')//Not.exist Notications

    cy.wait(500)
    cy.get('.btn').click()
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Username is existing')
    cy.get('input').eq(5).type('Check')
    cy.contains('Username is existing').should('not.exist')//Not.exist Notications


    cy.get('.text-vnlp-1').click()
    cy.wait(1500)
    cy.get('.register > .text-vnlp-1').click()
    cy.get('.change-language').click()
    cy.get('ul li a').should('contain', 'English').should('contain', 'Tiếng Việt')
    cy.contains('Tiếng Việt').click()
  })

  it('Register VI', () => {
    cy.wait(1000)
    cy.contains('Đăng ký!').click()
    cy.url().should('include', '/register') // => trủe
    cy.url().should('eq', 'https://va-test.vnlp.ai/#/users/register') // => true

    cy.get('.img-responsive').should('be.visible')
    cy.get('.img-responsive').should('have.attr', 'src', '../../../assets/images/logo/logo.png')

    cy.get('.change-language').click()
    cy.get('ul li a').should('contain', 'English').should('contain', 'Tiếng Việt')
    cy.contains('Tiếng Việt').click()




    //Localizations //Color //Backgr.... VI
    cy.get('.img-responsive').should('be.visible')
    cy.get('.img-responsive').should('have.attr', 'src', '../../../assets/images/logo/logo.png')

    cy.get('h4').should('contain', 'Đăng ký').should('have.css', 'color', 'rgb(33, 33, 33)')

    cy.wait(500)
    cy.get('label').eq(0).should('contain', 'Họ và tên')
    cy.get('span').eq(0).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(0).should('be.enabled')

    cy.get('label').eq(1).should('contain', 'Số điện thoại')
    cy.get('span').eq(1).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(1).should('be.enabled')

    cy.wait(500)
    cy.get('label').eq(2).should('contain', 'Email')
    cy.get('span').eq(2).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(2).should('be.enabled')

    cy.get('label').eq(3).should('contain', 'Địa chỉ')
    cy.get('input').eq(3).should('be.enabled')

    cy.get('label').eq(4).should('contain', 'Tổ chức')
    cy.get('input').eq(4).should('be.enabled')

    cy.wait(500)
    cy.get('label').eq(5).should('contain', 'Tài khoản')
    cy.get('span').eq(3).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(5).should('be.enabled')

    cy.get('label').eq(6).should('contain', 'Mật khẩu')
    cy.get('span').eq(4).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(6).should('be.enabled')

    cy.wait(500)
    cy.get('label').eq(7).should('contain', 'Nhập lại mật khẩu')
    cy.get('span').eq(5).should('contain', '*').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('input').eq(7).should('be.enabled')

    cy.get('button').should('contain', 'Đăng ký')
      .should('have.css', 'background', 'linear-gradient(256deg, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)) repeat scroll 0% 0% / auto padding-box border-box, rgba(0, 0, 0, 0) linear-gradient(rgb(255, 114, 1), rgb(255, 114, 1)) repeat scroll 0% 0% / auto padding-box border-box')
      .should('have.css', 'color', 'rgb(255, 255, 255)') //Color text in button Submit

    cy.wait(500)
    cy.get('label').eq(8).should('contain', 'Bạn đã có tài khoản?')
    cy.contains('Đăng nhập ngay').should('contain', 'Đăng nhập ngay').should('have.css', 'color', 'rgb(255, 114, 1)')

    //Color text: Fullname/Phone/Email/Orgname/.......
    cy.get('label').should('have.css', 'color', 'rgb(33, 33, 33)')


    //Logic
    cy.get('.btn').click()
    cy.get('input').eq(0).should('be.enabled').should('have.css', 'border', '1px solid rgb(255, 0, 0)')//Fullname
    cy.get('input').eq(1).should('be.enabled').should('have.css', 'border', '1px solid rgb(255, 0, 0)')//PhoneNumber
    cy.get('input').eq(2).should('be.enabled').should('have.css', 'border', '1px solid rgb(255, 0, 0)')//Email
    //Address  //Orgname No required
    cy.get('input').eq(5).should('be.enabled').should('have.css', 'border', '1px solid rgb(255, 0, 0)')//Username
    cy.get('input').eq(6).should('be.enabled').should('have.css', 'border', '1px solid rgb(255, 0, 0)')//Password

    cy.wait(500)
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Họ và tên không được để trống')//Fullname
    cy.get('.error-validate.ng-star-inserted').eq(1).should('contain', 'Số điện thoại không được để trống')//PhoneNumber
    cy.get('.error-validate.ng-star-inserted').eq(2).should('contain', 'Email không được để trống')//Email
    //Address  //Orgname No required
    cy.get('.error-validate.ng-star-inserted').eq(3).should('contain', 'Vui lòng nhập tên tài khoản')//Username
    cy.get('.error-validate.ng-star-inserted').eq(4).should('contain', 'Vui lòng nhập mật khẩu ')//Password

    cy.get('.error-validate.ng-star-inserted').should('have.css', 'color', 'rgb(250, 98, 75)')//Color

    cy.wait(500)
    cy.get('input').eq(0).type('!#$%^')//Validate character special
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Họ và tên không hợp lệ')
    cy.get('input').eq(0).type('{selectall}{backspace}')//Empty
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Họ và tên không được để trống')
    cy.get('input').eq(0).type('220597')//Validate Number
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Họ và tên không hợp lệ')
    cy.get('input').eq(0).type('{selectall}{backspace}Đỗ Quốc Đạt')//Not.exist Notications
    cy.contains('Họ và tên không hợp lệ').should('not.exist')

    cy.get('input').eq(1).type('!#$%^')//Validate character special
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Số điện thoại không hợp lệ')
    cy.get('input').eq(1).type('{selectall}{backspace}')//Empty
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Số điện thoại không được để trống')
    cy.get('input').eq(1).type('Hahaahaa')//Validate Text
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Số điện thoại không hợp lệ')
    cy.get('input').eq(1).type('{selectall}{backspace}0789905497     ')//Space
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Số điện thoại không hợp lệ')
    cy.get('input').eq(1).type('{selectall}{backspace}0769632239', { delay: 50 })//Not.exist Notications
    cy.contains('Số điện thoại không hợp lệ').should('not.exist')

    cy.wait(500)
    cy.get('input').eq(2).type('!#$%^')//Validate character special
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Email không hợp lệ')
    cy.get('input').eq(2).type('{selectall}{backspace}')//Empty
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Email không được để trống')
    cy.get('input').eq(2).type('doquocdat2205')//Validate Text
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Email không hợp lệ')
    cy.get('input').eq(2).type('{selectall}{backspace}phamthuthao0906@gmail.com     ', { delay: 50 })//Space
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Email không hợp lệ')
    cy.get('input').eq(2).type('{selectall}{backspace}doquocdat2205@gmail.com', { delay: 50 })//Not.exist Notications
    cy.contains('Email không hợp lệ').should('not.exist')

    cy.wait(500)
    cy.get('input').eq(5).type('!#$%^')//Validate character special
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Tên tài khoản không hợp lệ')
    cy.get('input').eq(5).type('{selectall}{backspace}')//Empty
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Vui lòng nhập tên tài khoản')
    cy.get('input').eq(5).type('á à ả')//Validate Text
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Tên tài khoản không hợp lệ')
    cy.get('input').eq(5).type('{selectall}{backspace}Space     ')//Space
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Tên tài khoản không hợp lệ')
    cy.get('input').eq(5).type('{selectall}{backspace}dat.do')//Not.exist Notications
    cy.contains('Tên tài khoản không hợp lệ').should('not.exist')

    cy.wait(500)
    cy.get('input').eq(6).type('DD   ')//Validate character special
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Nhập ít nhất 6 ký tự')
    cy.get('input').eq(6).type('{selectall}{backspace}')//Empty
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Vui lòng nhập mật khẩu')
    cy.get('input').eq(6).type('220597')//Not.exist Notications
    cy.contains('Vui lòng nhập mật khẩu').should('not.exist')

    cy.get('.btn').click()
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Xác nhận mật khẩu không trùng khớp')
    cy.get('input').eq(7).type('220597')
    cy.contains('Xác nhận mật khẩu không trùng khớp').should('not.exist')//Not.exist Notications

    cy.wait(500)
    cy.get('.btn').click()
    cy.get('.error-validate.ng-star-inserted').eq(0).should('contain', 'Người dùng đã tồn tại')
    cy.get('input').eq(5).type('Check')
    cy.contains('Người dùng đã tồn tại').should('not.exist')//Not.exist Notications


  })
})

