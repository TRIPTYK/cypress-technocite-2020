describe('login test', ()=>{
    it('should login an existing user',()=>{
        cy.createUser().then(user=>{
            cy.visit('/')
            cy.findByText(/login/i).click()
            cy.findByTestId('email').type(user.email)
            cy.findByTestId('password').type(user.password)
            cy.findByTestId('submit').click()
            cy.assertHome()
            cy.assertLoggedIn()
        })
    })
})