import {buildUser} from './generate'
Cypress.Commands.add('assertHome',()=>{
    cy.url().should('eq',`${Cypress.config().baseUrl}/`)
})
Cypress.Commands.add('assertLoggedIn',()=>{
    cy.window()
    .its('localStorage.tpk-token').should('be.a', 'string')
})
Cypress.Commands.add('createUser',overrides=>{
    const user = buildUser(overrides);
    cy.request({
        url:'http://localhost:3000/register',
        method:'POST',
        body:user
    }).then(response =>({...response.body.user,...user}))
})