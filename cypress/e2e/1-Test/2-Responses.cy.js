context('Responses', () => {
	beforeEach(() => {

		cy.visit('https://va-test.vnlp.ai/')

	})

	// https://on.cypress.io/interacting-with-elements

	it('Create Response', () => {

		//API
		cy.intercept('/auth/login').as('login')
		//API
		cy.intercept('/v1/responses').as('respon')

		cy.get('#username')

			// Delay each keypress by 0.2 sec
			.type('dat.do', { delay: 200 })
			.should('have.value', 'dat.do')

		cy.get('#password')
			.type('taonemay123').should('have.value', 'taonemay123')

		cy.get('.btn').click()

		cy.wait(2000)

		cy.get(':nth-child(2) > .js-is-select').click()
		cy.get('ul li a').should('contain', 'English').should('contain', 'Tiếng Việt')
		cy.contains('English').click()

		//Get Home
		cy.contains('Faker').click()
		cy.wait(2000)
		cy.wait('@login')
		cy.wait(2000)
		cy.contains('Build Bots', { timeout: 10000 }).click() //Open Conversations
		cy.contains('Flow Editor (v1.0)').click()
		cy.wait(1000)
		cy.contains('Response', { timeout: 10000 }).click()


		cy.wait(2000)
		//Create Responses type "IMG"
		//cy.contains('Create').click()
		cy.contains('Create').click()	//Create Responses
		cy.wait(1000)
		cy.get('[placeholder="Name"]').click()
			.type('IMG res').should('have.value', 'IMG res')

		cy.get('.p-dropdown-label').click()
		cy.get(':nth-child(2) > .p-dropdown-item').click()

		cy.get('.error').focus()
			.type('https://img.vn/uploads/thuvien/viber-image-2019-08-06-10-40-38-jpg-20190807145944LO3qbinQdG.jpg')


		cy.get('.text-right > .btn').click()

		cy.get('.p-toast-message-content').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("NotificationSaved successfully");
				//Check noti when save successfully
			})
		//Tắt nút X khi thông báo Successfully
		cy.get('.p-toast-icon-close-icon').click()

		//Create Responses type "Button"
		cy.get(':nth-child(1) > .btn').click()	//Create Responses
		cy.wait('@respon')
		cy.get('.col.mb-3 > .ng-untouched').eq(0).click()
			.type('Button res').should('have.value', 'Button res')

		cy.get('.p-dropdown-label').click()
		cy.get(':nth-child(3) > .p-dropdown-item').click()

		cy.get('.position-relative > .ng-untouched').focus()
			.type('Button').should('have.value', 'Button')


		cy.get('.content-card > .text-right > .btn').click()
		cy.get('.content-card > :nth-child(3) > .ng-untouched').focus()
			.type('Easyhion').should('have.value', 'Easyhion', { delay: 300 })
		cy.get(':nth-child(3) > .remove-text > .vnlp-icon', { delay: 300 }).click()

		cy.get('.new-button-card > input.ng-untouched').focus() //Enter button title 1...
			.type('Enter button title 1...').should('have.value', 'Enter button title 1...')

		cy.get('.ng-untouched > .p-dropdown > .p-dropdown-label').click()
		cy.get(':nth-child(1) > .p-dropdown-item').click()

		cy.get('.add-button > .btn').click()
		cy.get('input.ng-untouched').focus()
			.type('Enter button title 2...').should('have.value', 'Enter button title 2...', { delay: 300 })

		cy.get('.ng-untouched > .p-dropdown > .p-dropdown-label').click()
		cy.get(':nth-child(1) > .p-dropdown-item').click()

		cy.get('.vnlp-icon.vnlp-icon-close-black', { delay: 500 }).then(ele => {
			ele[1].click() //Click cái thứ 2 Ele1 là từ 0-1
		})


		cy.get('.text-right > .btn').then(ele => {
			ele[1].click() // 2Button Submit if choose [1] = Button 2 - [0] = Button 1
		})

		cy.get('.p-toast-message-content').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("NotificationSaved successfully");
				//Check noti when save successfully
			})
		//Tắt nút X khi thông báo Successfully
		cy.get('.p-toast-icon-close-icon').click()

		//Create Responses type "Card"
		cy.get(':nth-child(1) > .btn').click()
		cy.wait('@respon')
		cy.get('.col.mb-3 > .ng-untouched').eq(0).click()
			.type('Card res').should('have.value', 'Card res')


		cy.get('.p-dropdown-label').click()
		cy.get(':nth-child(4) > .p-dropdown-item').click()

		cy.get('[placeholder="Enter Image Url"]').focus()
			//Image URL
			.type('https://img.vn/uploads/thuvien/viber-image-2019-08-06-10-40-38-jpg-20190807145944LO3qbinQdG.jpg')

		cy.get('[placeholder="Enter Card Title"]').focus()

			.type('Marin-Card title').should('have.value', 'Marin-Card title')//Card Title

		cy.get('[placeholder="Enter card subtitle"]').focus()//Enter card subtitle

			.type('Enter card subtitle').should('have.value', 'Enter card subtitle')


		cy.get('.new-button-card > input.ng-untouched').focus() //Enter button title 1...
			.type('Enter button title 1...').should('have.value', 'Enter button title 1...')

		cy.get('.ng-untouched > .p-dropdown > .p-dropdown-label').click()
		cy.get(':nth-child(1) > .p-dropdown-item').click()

		cy.get('.add-button > .btn').click()
		cy.get('input.ng-untouched').focus()
			.type('Enter button title 2...').should('have.value', 'Enter button title 2...', { delay: 300 })

		cy.get('.ng-untouched > .p-dropdown > .p-dropdown-label').click()
		cy.get(':nth-child(1) > .p-dropdown-item').click()

		cy.get('.vnlp-icon.vnlp-icon-close-black', { delay: 500 }).then(ele => {
			ele[1].click() //Click cái thứ 2 Ele1 là từ 0-1
		})





		cy.get('.text-right > .btn', { timeout: 3000 }).then(ele => {
			ele[1].click() //Click cái thứ 2 Ele1 là từ 0-1.click()
		})

		cy.get('.p-toast-message-content', { timeout: 3000 }).invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("NotificationSaved successfully");
				//Check noti when save successfully
			})
		//Tắt nút X khi thông báo Successfully
		cy.get('.p-toast-icon-close-icon').click()


		//Create Responses type "Quick Replies"
		cy.get(':nth-child(1) > .btn').click()
		cy.get('.col.mb-3 > .ng-untouched').eq(0).click()
			.type('Quick res').should('have.value', 'Quick res')

		cy.get('.p-dropdown-label').click()
		cy.get(':nth-child(5) > .p-dropdown-item').click()

		cy.get('.position-relative > .mb-2').focus()
			//Content*
			.type('Hôm nay là thứ 7 Thảo thích đi thích đi vào Bar, Nhạc lên là Thảo quẩy Thảo s.e.x.y s.e.x.y vậy ta…')
			.should('have.value', 'Hôm nay là thứ 7 Thảo thích đi thích đi vào Bar, Nhạc lên là Thảo quẩy Thảo s.e.x.y s.e.x.y vậy ta…')

		cy.get(':nth-child(1) > :nth-child(1) > .text-right > .btn').click()
		cy.get(':nth-child(3) > .mb-2').focus()
			.type('Impact-SKT').should('have.value', 'Impact-SKT')
		cy.wait(600)

		cy.get(':nth-child(3) > .remove-text > .vnlp-icon', { timeout: 10000 }).click() //Tắt tab content


		cy.get('.new-button-card > input.ng-untouched').focus() //Enter button title 1...
			.type('Quick conten').should('have.value', 'Quick conten')

		cy.get('.ng-pristine > .p-dropdown > .p-dropdown-label').click()
		cy.get(':nth-child(1) > .p-dropdown-item').click()

		cy.get('.add-button > .btn').click()
		cy.get('input.ng-untouched').focus()
			.type('Quick Content 2').should('have.value', 'Quick Content 2', { delay: 300 })

		cy.get('.ng-untouched > .p-dropdown > .p-dropdown-label').click()
		cy.get(':nth-child(1) > .p-dropdown-item').click()

		cy.get('.vnlp-icon.vnlp-icon-close-black', { delay: 500 }).then(ele => {
			ele[1].click() //Click cái thứ 2 Ele1 là từ 0-1
		})

		cy.get('.text-right.mt-3 > .btn').click() //Save button
		cy.get('.p-toast-message-content').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("NotificationSaved successfully");
				//Check noti when save successfully
			})
		//Tắt nút X khi thông báo Successfully
		cy.get('.p-toast-icon-close-icon').click()


		//Check validate
		cy.get('.p-inputwrapper-filled > .custom-dropdown > .p-dropdown-label').then(ele => {
			ele[0].click() //Click cái thứ 2 Ele1 là từ 0-1
		})
		cy.get(':nth-child(2) > .p-dropdown-item').click()
		cy.wait('@respon')
		cy.wait(2000)
		cy.get('.p-paginator-current', { timeout: 10000 }).invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 0 To 0 of 0 entries", { timeout: 5000 });
				//Check Text show
			})

		cy.get('.p-inputwrapper-filled > .custom-dropdown > .p-dropdown-label').then(ele => {
			ele[0].click() //Click cái thứ 2 Ele1 là từ 0-1
		})
		cy.contains('Image').click()

		cy.wait(2000)
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 1 To 1 of 1 entries", { timeout: 5000 });
				//Check Text show
			})
		//API
		cy.intercept('/v1/responses').as('respon')

		cy.get('.p-inputwrapper-filled > .custom-dropdown > .p-dropdown-label').then(ele => {
			ele[0].click() //Click cái thứ 2 Ele1 là từ 0-1
		})
		cy.get(':nth-child(4) > .p-dropdown-item').click()

		cy.wait(2000)
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 1 To 1 of 1 entries", { timeout: 5000 });
				//Check Text show
			})

		cy.get('.p-inputwrapper-filled > .custom-dropdown > .p-dropdown-label').then(ele => {
			ele[0].click() //Click cái thứ 2 Ele1 là từ 0-1
		})
		cy.get(':nth-child(5) > .p-dropdown-item').click()

		cy.wait(2000)
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 1 To 1 of 1 entries");
				//Check Text show
			})

		cy.get('.p-inputwrapper-filled > .custom-dropdown > .p-dropdown-label').then(ele => {
			ele[0].click() //Click cái thứ 2 Ele1 là từ 0-1
		})
		cy.get(':nth-child(6) > .p-dropdown-item').click()

		cy.wait(2000)
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 1 To 1 of 1 entries");
				//Check Text show
			})

		cy.get('.p-inputwrapper-filled > .custom-dropdown > .p-dropdown-label').then(ele => {
			ele[0].click() //Click cái thứ 2 Ele1 là từ 0-1
		})
		cy.get(':nth-child(7) > .p-dropdown-item').click()

		cy.wait(2000)
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 0 To 0 of 0 entries");
				//Check Text show
			})


		//Check Validate Right (All intent)
		cy.get('.p-inputwrapper-filled > .custom-dropdown > .p-dropdown-label').then(ele => {
			ele[0].click() //Click cái thứ 2 Ele1 là từ 0-1
		})
		cy.get(':nth-child(2) > .p-dropdown-item').click()

		cy.wait(2000)
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 0 To 0 of 0 entries");
				//Check Text show
			})

		//Check Validate Right (All intent)
		cy.get('.p-inputwrapper-filled > .custom-dropdown > .p-dropdown-label').then(ele => {
			ele[0].click() //Click cái thứ 2 Ele1 là từ 0-1
		})
		cy.get(':nth-child(3) > .p-dropdown-item').click()

		cy.wait(2000)
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 1 To 1 of 1 entries");
				//Check Text show
			})

		//Get Defaut (All Data - All intent)

		cy.get('.p-inputwrapper-filled > .custom-dropdown > .p-dropdown-label').then(ele => {
			ele[0].click() //Click cái thứ 2 Ele1 là từ 0-1
		})
		cy.get(':nth-child(1) > .p-dropdown-item').click()
		cy.wait(2000)
		cy.get('.p-inputwrapper-filled > .custom-dropdown > .p-dropdown-label', { timeout: 10000 }).then(ele => {
			ele[0].click() //Click cái thứ 2 Ele1 là từ 0-1
		})
		cy.get(':nth-child(1) > .p-dropdown-item').click()

	})

	it('Search Response', () => {
		cy.wait(2000)
		//API
		cy.intercept('/auth/login').as('login')
		//API
		cy.intercept('/v1/responses').as('respon')

		cy.get('#username')

			// Delay each keypress by 0.2 sec
			.type('dat.do', { delay: 200 })
			.should('have.value', 'dat.do')

		cy.get('#password')
			.type('taonemay123').should('have.value', 'taonemay123')

		cy.get('.btn').click()
		//Get Home
		cy.contains('Faker').click()

		cy.wait('@login')
		cy.contains('Build Bots', { timeout: 10000 }).click() //Open Conversations
		cy.contains('Bot Flow - v1', { timeout: 10000 }).click()
		cy.contains('Responses', { timeout: 10000 }).click()

		//Search Input
		cy.get('.input-search > input', { timeout: 10000 }).focus()
			.type('Res').should('have.value', 'Res')

		cy.get('.loading').should('be.visible')
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 1 To 4 of 4 entries");
				//Check Text show
			})


		cy.get('.input-search > input').focus()
			.type('{del}{selectall}{backspace}')
			.type('empty').should('have.value', 'empty')

		cy.wait(1700)
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 0 To 0 of 0 entries");
				//Check Text show
			})


		cy.get('.input-search > input').focus()
			.type('{del}{selectall}{backspace}')
			.type('Quick res').should('have.value', 'Quick res')

		cy.wait(1700)
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 1 To 1 of 1 entries");
				//Check Text show
			})
		cy.contains('Quick res').click()
	})


	it('Delete Response', () => {
		cy.wait(2000)
		//API
		cy.intercept('/auth/login').as('login')
		//API
		cy.intercept('/v1/responses').as('respon')

		cy.get('#username')

			// Delay each keypress by 0.2 sec
			.type('dat.do', { delay: 200 })
			.should('have.value', 'dat.do')

		cy.get('#password')
			.type('taonemay123').should('have.value', 'taonemay123')

		cy.get('.btn').click()
		//Get Home
		cy.contains('Faker').click()

		cy.wait('@login')
		cy.contains('Build Bots', { timeout: 10000 }).click() //Open Conversations
		cy.contains('Bot Flow - v1', { timeout: 10000 }).click()
		cy.contains('Responses', { timeout: 10000 }).click()
		cy.wait(2000)


		cy.get('.table-quick-action > .ng-star-inserted > .vnlp-icon').eq(0).click()
		cy.contains('Are you sure you want to delete the response Quick res?').should('be.visible')
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
		cy.wait(700)
		cy.contains('Quick res').should('not.exist')


		cy.get('.table-quick-action > .ng-star-inserted > .vnlp-icon').eq(0).click()
		cy.contains('Are you sure you want to delete the response Card res?').should('be.visible')
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
		cy.wait(700)
		cy.contains('Card res').should('not.exist')


		cy.get('.table-quick-action > .ng-star-inserted > .vnlp-icon').eq(0).click()
		cy.contains('Are you sure you want to delete the response Button res?').should('be.visible')
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
		cy.wait(700)
		cy.contains('Button res').should('not.exist')


		cy.get('.table-quick-action > .ng-star-inserted > .vnlp-icon').eq(0).click()
		cy.contains('Are you sure you want to delete the response IMG res?').should('be.visible')
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
		cy.wait(700)
		cy.contains('IMG res').should('not.exist')


		cy.contains('No data available').should('be.visible')
		cy.get('.p-paginator-current').invoke('text')
			.then((text) => {
				const toastText = text;
				expect(toastText).to.equal("Showing 0 To 0 of 0 entries");
				//Check Text show
			})
	})




})


