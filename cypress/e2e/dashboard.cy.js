describe('Usuário logado na página de dashboard', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('senha'))
    })

    context('Redirecionamento na página de dashboard', () => {
        it('Verifica página de redirecionamento no login com sucesso', () => {
            cy.visit('/dashboard')
            cy.url().should('eq', 'http://localhost:3000/dashboard')
        })

        it('Com o usuário logado, cadastra um especialista', () => {
            cy.visit('/dashboard')
            cy.url().should('eq', 'http://localhost:3000/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
        })
    })

    context('Modal de cadastro de especialista', () => {
        it('Verifica se o checkbox "Atende por plano?" está desmarcado', () => {
            cy.visit('/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
            cy.get('[type="checkbox"]').should('have.attr', 'aria-label', 'Atende por plano?').and('not.be.checked')
        })

        it('Seleciona o botão checkbox "Atende por plano?" para visualizar os planos de saúde', () => {
            cy.visit('/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
            cy.get('[type="checkbox"]').check()
            cy.get('form').find('input[type="checkbox"]').should('be.checked').and('not.be.disabled')
            cy.get('[type="checkbox"]').check(['Sulamerica', 'Unimed', 'Bradesco'])
        })

        it('Seleciona o botão checkbox "Atende por plano?" para visualizar os planos de saúde', () => {
            cy.visit('/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
            cy.get('[type="checkbox"]').check()
            cy.get('form').find('input[type="checkbox"]').should('be.checked').and('not.be.disabled')
            cy.get('[type="checkbox"]').check(['Sulamerica', 'Unimed', 'Bradesco'])
        })

        it('Seleciona o botão checkbox "Atende por plano?" após preenchimento do formulário para visualizar os planos de saúde', () => {
            cy.fixture('especialistas').then((dados) => { // Carrega os dados do fixture
                const especialista = dados.especialistas[0]; // Acessa o primeiro especialista

                // Cadastra o especialista
                cy.cadastraEspecialista(
                    especialista.nome,
                    especialista.email,
                    especialista.senha,
                    especialista.especialidade,
                    especialista.crm,
                    especialista.imagem,
                    especialista.cep,
                    especialista.rua,
                    especialista.numero,
                    especialista.complemento,
                    especialista.estado
                );

                // Marca o checkbox "Atende por plano?"
                cy.get('[type="checkbox"]').check()

                // Rolando para o último checkbox para garantir visibilidade
                cy.get('[type="checkbox"]').last().scrollIntoView({ easing: 'linear' })

                // Verificar se os checkboxes estão visíveis
                cy.get('.MuiFormGroup-root').children().each(($checkbox) => {
                    cy.wrap($checkbox).should('be.visible')
                })
            })
        })
    })
})
