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

import { throwError } from "rxjs"

Cypress.Commands.add("checkNFTCard", () => {
    cy.wait(2000)
    cy.get('body').then((body)=>{
            //Check card image or video
        if (body.find('[data-test-id="listing-asset-image"]').length > 0) {
            cy.get('[data-test-id="listing-asset-image"]').should('be.visible')
            cy.get('[data-test-id="listing-asset-image"]').should('have.attr','src')
        }
        else {
            cy.get('video').should('be.visible')
            cy.get('video').should('have.attr','src')
        }

        //check collection image
        if (body.find('[data-test-id="listing-collection-label"]').length > 0) {
            cy.get('[data-test-id="listing-collection-label"]').should('have.text','Collection')
            cy.get('[data-test-id="listing-collection-label"]').parent().find('a').should('have.attr','href')
            cy.get('[data-test-id="listing-collection-name"]').invoke('text').should('match', /\w/)
        }
        //check avatar
        if (body.find('[data-test-id="listing-owner-avatar"]').length > 0) {
            cy.get('[data-test-id="listing-owner-avatar"]').find('img').should('have.attr','src')
        }
        // Price
        if(body.find('[data-test-id="nftDetail-price"]').length > 0 ) {
            cy.get('[data-test-id="nftDetail-price"]').invoke('text').then((priceText)=>{
                cy.log(priceText)
                const price = parseInt(priceText.replace(",",""))
                if (isNaN(price) || price < 0)
                    throw new Error("Price incorect")
                else {
                    if (body.find('[data-test-id="bid-amount-label"]').length > 0) {
                        cy.get('[data-test-id="bid-amount-label"]').invoke('text').then((bidText)=>{
                            console.log(bidText)
                            if(bidText != "Current Bid" && bidText != "Starting Bid")
                                throw new Error("Bid incorect")
                        })
                        cy.get('[data-test-id="nftDetail-bid-button"]').should('have.text','Place a bid')
                    }
                    else {
                        cy.get('[data-test-id="nftDetail-buy-button"]').should('have.text',`Buy For $${priceText}`)
                        cy.get('[data-test-id="nftDetail-offer-button"]').should('have.text','Make an Offer')
                    }
                }
            })
        }

    })

    //check likes count
    cy.get('[data-test-id="nftCard-likes-count"]').eq(6).invoke('text').then((text) => {
        cy.log(parseInt(text))
        if (parseInt(text) < 0)
            throw new Error("Likes count error")
    })


    //check avatar image
    cy.get('[data-test-id="listing-creator-avatar"]').find('img').should('be.visible')
    cy.get('[data-test-id="listing-creator-avatar"]').find('img').should('have.attr','src')
    //check creator name
    cy.get('[data-test-id="listing-creator-label"]').should('have.text','Creator')
    cy.get('[data-test-id="listing-creator-username"]').find('a').should('have.attr','href')
    cy.get('[data-test-id="listing-creator-username"]').find('span').invoke('text').should('match', /\w/)
    //check chain
    cy.get('[data-test-id="listing-chain-type-label"]').should('have.text','Chain:')
    cy.get('[data-test-id="listing-chain-type"]').invoke('text').should('match', /\w/)
    //check asset name
    cy.get('[data-test-id="listing-asset-name"]').invoke('text').should('match', /\w/)

    //check owner
    cy.scrollTo('bottom')
    cy.get('[data-test-id="listing-owner-label"]').should('have.text','Owner')
    cy.get('[data-test-id="listing-owner-username"]').find('a').should('have.attr','href')
    cy.get('[data-test-id="listing-owner-username"]').find('span').invoke('text').should('match', /\w/)
    cy.get('[data-test-id="listing-owner-wallet-address"]').invoke('text').should('match', /\w/)
    //check bar asset
    cy.get('[data-test-id="action-button-bar-asset-image"]').should('be.visible')
    cy.get('[data-test-id="action-button-bar-asset-image"]').should('have.css', 'background-image')

})