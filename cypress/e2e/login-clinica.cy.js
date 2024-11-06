describe('Página de Login', () => {
    beforeEach(() => {
        cy.visit('')  // Acesse a página inicial, substitua a URL se necessário
        cy.contains('Entrar').click()  // Clica no botão "Entrar"
    });

    it('Digita email e senha corretos para efetuar o login', () => {
        // Realiza o login utilizando o comando customizado
        cy.login(Cypress.env('email'), Cypress.env('senha'));
        cy.url().should('include', '/dashboard');  // Verifica se a URL inclui "/dashboard"

    });
});
