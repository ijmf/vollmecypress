describe('Testes de exemplo', () => {
    it('Exemplo de teste com cy.then() e cy.debug()', () => {
        cy.visit('https://google.com')
            .then(() => {
                // Realize algumas ações
            })
            .then(() => {
                cy.debug() // Pausa a execução do teste aqui e abre o console do navegador
            })
            .then(() => {
                // Continue com o teste
            })
    })


})

describe('Teste no site do Google', () => {
    it('Deve carregar a página inicial do Google', () => {
        cy.visit('https://www.google.com')
        cy.title().should('eq', 'Google') // Verifica se o título da página é "Google"

        cy.get('#APjFqb').should('exist').debug() // Verifica se o campo de busca existe, pausa a execução com o debug

    })
})


