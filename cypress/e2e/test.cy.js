/// <reference types= "cypress" />
describe('My First suite', () => {


    beforeEach('open automationbro site',()=>{
        cy.openAutomationBro()
    })


    // it('test register to automationbro',()=>{
  
    //     cy.get('#reg_username').type('testotorio')
    //     cy.get('#reg_email').type('test@otorio.co.il')
    //     cy.get('#reg_password').type('testotorio135!')
    //     cy.get('button[name="register"]').click()
    //     cy.get('.woocommerce-MyAccount-content p').should('contain.text','Hello testotorio')

    // })


    it('test sign in to automationbro', () =>{
        cy.signIn('testotorio','testotorio135!')
        cy.get('.woocommerce-MyAccount-content').should('contain.text','Hello testotorio')


    })

    it('Test incorrect email and password', () => {
        cy.signIn('maxxxt@gmail.com','admin213!23')
        cy.get('.woocommerce-notices-wrapper li').then((message) => {
            expect(message.text()).to.have.string('Unknown email address. Check again or try your username.')
        })
    })
    it('Test empty email and password', () => {
        cy.get('button[name="login"]').click()
        cy.get('.woocommerce-notices-wrapper li').then((message) => {
            expect(message.text()).to.have.string('Error: Username is required.')
        })
    })


    it('Test Sign out and check it was successful.', () => {
        cy.signIn('testotorio','testotorio135!')
        cy.contains('Log out').click()
        cy.url().should('include', 'https://practice.automationbro.com/my-account/')
        
    })

    it('Test signin and add item it to cart', () => {
        cy.visit('https://practice.automationbro.com/my-account/')
        cy.signIn('testotorio','testotorio135!')
        cy.contains('a', 'Shop').click()
        cy.get('a[data-product_id="359"]').click()
        cy.get('.tg-icon-shopping-cart:visible').click()
        cy.get('.product-name a').should('have.text','Branded Converse')
        cy.get('td[data-title="Total"]').should('have.text', '$150.00 ')
        
    })


})

