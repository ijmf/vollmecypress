describe('Teste da API para listar clínicas', () => {
    it('Deve retornar uma lista de clínicas', () => {
      // Realiza a requisição à rota que lista as clínicas
      cy.request('http://localhost:8080/clinica')
        .then((response) => {
          // Verifica se a resposta possui status 200
          expect(response.status).to.eq(200);
          
          // Verifica se a resposta possui o formato JSON
          expect(response.headers['content-type']).to.include('application/json');
          
          // Verifica se a resposta contém dados de clínicas
          expect(response.body).to.have.length.greaterThan(0);
          
          // Verifica se os dados são do tipo esperado (opcional)
          expect(response.body[0]).to.have.property('nome');
          expect(response.body[0]).to.have.property('id');
          expect(response.body[0]).to.have.property('role');
          // Adicione mais verificações de propriedades conforme necessário
          
          // Adicione mais verificações conforme necessário
        });
    });


    describe('Teste de logout no frontend', () => {
      it('Deve desautenticar o usuário após o logout', () => {
        cy.login(Cypress.env('email'), Cypress.env('senha'))
        // Visita a página onde está o botão de logout
        cy.visit('/dashboard');
    
        // Executa a ação de logout, como clicar em um botão
        cy.get('.sc-fLcnxK').click(); // Substitua com o seletor do botão de logout real
    
        // Verifica se o usuário foi desautenticado
        cy.window().its('localStorage.authToken').should('not.exist'); // Verifica se o token de autenticação foi removido do localStorage
    
        // Verifica se o usuário foi redirecionado para a página de login (opcional)
        cy.url().should('include', '/'); // Verifica se a URL contém a página de login
    
        // Adicione mais verificações conforme necessário, como a exibição de mensagens de sucesso, etc.
      });
    });

});
0