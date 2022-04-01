describe("Check card on marketplace ", () => {

    it("Go to crypto NFT marketplace", ()=>{
        cy.visit("https://crypto.com/nft/marketplace/")
        cy.wait(2000)
        cy.get('#onetrust-accept-btn-handler', {timeout:5000}).click()
    })

    it("Click and check", ()=> {
        //cy.get('#onetrust-accept-btn-handler', {timeout:5000}).click()
        let cur = 0
        let curTotal = 0
        const loopCheck = (()=>{
            cy.get('[data-test-id="nftCard-container"]').its('length').then((size) => {
                if(curTotal == size)
                {
                    cy.log('no more cards')
                    return
                }
                else {
                    curTotal = size
                    for(let i = cur ; i < curTotal ; i++) {
                        cy.get('[data-test-id="nftCard-container"]').eq(i).click()
                        cy.checkNFTCard()
                        cy.get('[data-test-id="listing-asset-name"]').invoke('text').then((text)=>{
                            cy.log(text)
                        })
                        cy.go('back')
                    }
                    cur = curTotal
                    cy.scrollTo(0, 2000)
                    cy.wait(2000)
                    loopCheck()
                }
            })

        })

        loopCheck()
    })

})

