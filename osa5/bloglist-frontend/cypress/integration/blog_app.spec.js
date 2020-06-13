describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

    it('front page can be opened and login is shown', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Login')
      cy.get('#username')
      cy.get('#password')
    })
    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.contains('wrong credentials')
    })
    it('login succees with right password', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
      cy.contains('Login succesful')
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })
      it('A blog can be created', function() {
        cy.get('#add-blog').click()
        cy.get('#title').type('a Blog created by cypress')
        cy.get('#author').type('Mr Cypress')
        cy.get('#url').type('www.cypressblog.com')
        cy.get('#likes').type(0)
        cy.contains('save').click()
        cy.contains('a Blog created by cypress')
      })

      describe('and a blog exists', function () {
        beforeEach(function () {
          cy.createBlog({ title: 'first blog', auhtor: 'Mr Smith', url: 'www.realwebsite.com', likes: 0 })
          cy.createBlog({ title: 'second blog', auhtor: 'Mr Jones', url: 'www.miniclip.com', likes: 0 })
          cy.createBlog({ title: 'third blog', auhtor: 'Mr Trump', url: 'www.cnn.com', likes: 0 })
        })
  
        it('it can be liked', function () {
          cy.contains('second blog').parent().find('#show-hide-button').click()
          cy.contains('second blog').parent().find('#likes-output').should('not.contain', 3)
          cy.contains('second blog').parent().find('#like-button').click()
          cy.contains('second blog').parent().find('#like-button').click()
          cy.contains('second blog').parent().find('#like-button').click()
          cy.contains('second blog').parent().find('#likes-output').should('contain', 3)
        })
      })


    })
  })