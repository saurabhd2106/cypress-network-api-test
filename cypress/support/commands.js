// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginToApp', (userEmail, userPassword)=>{
    let res;

    cy.request({
        method: 'POST',
        url: '/api/users/login',
        host: "localhost",
        port: 3000,
        body: {
            user:
            {
                "email": userEmail,
                "password": userPassword
            }
        }
    }).then(response =>{
        cy.log(JSON.stringify(response))
        res = response

        expect(response.status).to.equal(200)

      
    })

    cy.visit("/", {
        onBeforeLoad(win) {
            win.localStorage.setItem('user', JSON.stringify(res.body.user))
        }
    })
})