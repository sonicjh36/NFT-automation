import { recurse } from 'cypress-recurse'


describe("Check sales volume sort display ", () => {

    it("Go to crypto NFT", ()=>{
        cy.visit("https://crypto.com/nft/")
        cy.get('#onetrust-accept-btn-handler', {timeout:5000})
        cy.contains('Accept All').click()
    })

    it("Click sort", ()=> {
        cy.contains('Sales Volume').click()
        cy.get('.css-1qf0gdb > .css-luvy8h > :nth-child(1)').click()

    })

    it("Show all collection", ()=>{
        const clickShowMore = () => {
            cy.get('body').then((body)=>{
                if (body.find('.css-81u8d6').length > 0) {
                    cy.contains('show more').click()
                    cy.scrollTo('bottom')
                    clickShowMore()
                }
            })
        }

        clickShowMore()
    })

    it("compare all the prize", ()=>{
        cy.get('[data-test-id="nftCard-container"]').its('length').then((size) => {
            let biggerPrize = 0
            for(let i = 0 ; i < size ; i++) {
                cy.get('[data-test-id="nftCard-container"]')
                .eq(i).find('[data-test-id="nftCard-total-sales-tag"]').invoke('text')
                .then((text)=>{
                    const curPrize = parseInt(text.split('$')[1].replace(",",""), 10) // transfer money to int
                    cy.log(`item${i} curPrize = ${curPrize}`)
                    if(i==0)
                        biggerPrize = curPrize
                    else {
                        if(biggerPrize >= curPrize) {
                            biggerPrize = curPrize
                        }
                        else
                            throw new Error("Sales volumes incorect")
                    }
                })
            }
        })
    })

})

