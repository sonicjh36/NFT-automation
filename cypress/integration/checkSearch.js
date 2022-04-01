describe("Check search feature", () => {
    let searchStr = "snoop"
    it("Go to crypto NFT marketplace", ()=>{
        cy.visit("https://crypto.com/nft/marketplace/")
        cy.wait(2000)
        cy.get('#onetrust-accept-btn-handler', {timeout:5000}).click()
    })

    it("input search", ()=>{
        cy.get('[data-test-id="nav-search-box-input"]').type(`${searchStr}{enter}`)
    })

    it("check cards", ()=>{
        let cur = 0
        let curTotal = 0
        const checkAssetName = ( (i)=> {
            cy.get('[data-test-id="nftCard-asset-name"]').eq(i).invoke('text').then((text)=>{
                if(text.toLowerCase().includes(searchStr))
                    return true
                else {
                    cy.get('[data-test-id="nftCard-creator-username"]').eq(i).invoke('text').then((text)=>{
                        if(text.toLowerCase().includes(searchStr))
                            return true
                        else
                            throw new Error("Search incorrect")
                    })
                }
            })
        })
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
                        checkAssetName(i)
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