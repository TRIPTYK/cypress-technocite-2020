describe('anonymous calculation',()=>{
    it('can make calculations', ()=>{
        const user = cy
        user.visit('/')
        user.findByTestId('1').click()
        user.findByTestId('+').click()
        user.findByTestId('9').click()
        user.findByTestId('=').click()
        user.findByTestId('display').should('have.text','10')
    })
    it('can make / calculations', ()=>{
        const user = cy
        user.visit('/')
        user.findByTestId('5').click()
        user.findByTestId('/').click()
        user.findByTestId('4').click()
        user.findByTestId('=').click()
        user.findByTestId('display').should('have.text','1.25')
    })

})
