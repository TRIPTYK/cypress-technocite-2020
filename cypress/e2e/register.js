import {buildUser} from '../support/generate'
describe('registration',()=>{
    it('should register a new user',()=>{
        const user=buildUser()
        // console.log(user)
        cy.visit('/')
        cy.findByText(/register/i).click()
        cy.findByTestId('email').type(user.email)
        cy.findByTestId('password').type(user.password)
        cy.findByTestId('submit').click()
        cy.assertHome()
        cy.assertLoggedIn()
    })
    it('should show an error message if there is an error registering',()=>{
        const user=buildUser()
        cy.server()
        cy.route({
            method:'POST',
            url:'http://localhost:3000/register',
            status:500,
            response:{}
        })
        cy.visit('/register')
        cy.findByTestId('email').type(user.email)
        cy.findByTestId('password').type(user.password)
        cy.findByTestId('submit').click()
    })
})