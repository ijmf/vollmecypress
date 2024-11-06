Cypress.Commands.add('login', (email, senha) => {
    cy.visit('/login');  // Acessa a página de login
    cy.get('[data-test="inputLoginEmail"]').type(email);  // Preenche o campo de e-mail
    cy.get('[data-test="inputLoginSenha"]').type(senha, { log: false });  // Preenche o campo de senha de forma oculta no log
    cy.get('[data-test="botaoTeste"]').should('be.visible').click();  // Clica no botão de login

    // Verifica o redirecionamento para o dashboard
    cy.location('pathname', { timeout: 10000 }).should('include', '/dashboard');  // A URL final deve incluir "/dashboard"

    // Após o redirecionamento para o dashboard, podemos usar o cy.session() para preservar a sessão
    //cy.session([email, senha], () => {
    // Aqui você pode armazenar qualquer dado da sessão que precise ser reutilizado
    cy.visit('/dashboard');  // Visita o dashboard para garantir que a página está acessada
});






Cypress.Commands.add('cadastraEspecialista', (nome, email, senha, especialidade, crm, imagem, cep, rua, numero, complemento, estado) => {
    cy.visit('/dashboard')
    cy.contains('Cadastrar especialista').should('be.visible').click()
    cy.get('[data-test="inputEspecialistaNome"]').type(nome)
    cy.get('[data-test="inputEspecialistaEmail"]').type(email)
    cy.get('[data-test="inputEspecialistaSenha"]').type(senha)
    cy.get('[data-test="inputEspecialistaSenhaVerificada"]').type(senha)
    cy.get('[data-test="inputEspecialistaEspecialidade"]').type(especialidade)
    cy.get('[data-test="inputEspecialistaCRM"]').type(crm)
    cy.get('[data-test="inputEspecialistaImagem"]').type(imagem)
    cy.get('[data-test="inputEspecialistaCEP"]').type(cep)
    cy.get('[data-test="inputEspecialistaRua"]').type(rua)
    cy.get('[data-test="inputEspecialistaNumero"]').type(numero)
    cy.get('[data-test="inputEspecialistaComplemento"]').type(complemento)
    cy.get('[data-test="inputEspecialistaEstado"]').type(estado)

})

Cypress.Commands.add('loginApi', (email, senha) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('api_login'),
        body: {
            email: email,
            senha: senha
        }
    }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.auth).to.be.true;
        expect(response.body.rota).to.eq('/clinica');
        expect(response.body.token).to.exist;
        cy.wrap(response.body.token).as('token');
    })
})