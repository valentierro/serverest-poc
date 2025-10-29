import { ApiHelper } from '../../../utils/ApiHelper';

describe('Testes de API - Usuários', () => {
  let userId: string;
  let userData: any;

  beforeEach(() => {
    // Gerar dados aleatórios usando Faker
    cy.generateRandomUser().then((randomUser) => {
      userData = {
        nome: randomUser.nome,
        email: randomUser.email,
        password: randomUser.password,
        administrador: 'true'
      };
    });
  });

  describe('CRUD de Usuários', () => {
    // TESTES POSITIVOS (3)
    it('deve criar um novo usuário com sucesso (teste positivo)', () => {
      ApiHelper.post('/usuarios', userData).then((response) => {
        ApiHelper.verificarSucesso(response);
        expect(response.body.message).to.equal('Cadastro realizado com sucesso');
        
        // Salvar ID do usuário para testes subsequentes
        userId = response.body._id;
        cy.log('✅ Usuário criado com ID:', userId);
      });
    });

    it('deve buscar usuários existentes (teste positivo)', () => {
      ApiHelper.get('/usuarios').then((response) => {
        ApiHelper.verificarSucessoGet(response);
        expect(response.body).to.have.property('usuarios');
        expect(response.body.usuarios).to.be.an('array');
        cy.log('✅ Usuários encontrados:', response.body.quantidade);
      });
    });

    it('deve atualizar dados de um usuário existente (teste positivo)', () => {
      // Primeiro criar um usuário
      ApiHelper.post('/usuarios', userData).then((createResponse) => {
        userId = createResponse.body._id;
        
        // Dados atualizados
        const dadosAtualizados = {
          ...userData,
          nome: 'Usuario Atualizado',
          email: `atualizado.${Date.now()}@exemplo.com`
        };

        // Atualizar usuário
        ApiHelper.put(`/usuarios/${userId}`, dadosAtualizados).then((updateResponse) => {
          ApiHelper.verificarSucesso(updateResponse);
          expect(updateResponse.body.message).to.equal('Registro alterado com sucesso');
          cy.log('✅ Usuário atualizado com sucesso');
        });
      });
    });

    // TESTES NEGATIVOS (2)
    it('deve validar erro ao criar usuário com email duplicado (teste negativo)', () => {
      // Criar primeiro usuário
      ApiHelper.post('/usuarios', userData).then((firstResponse) => {
        // Não validar status aqui para manter um status code por teste
        // Tentar criar usuário com mesmo email
        ApiHelper.post('/usuarios', userData).then((duplicateResponse) => {
          expect(duplicateResponse.status).to.equal(400);
          expect(duplicateResponse.body.message).to.equal('Este email já está sendo usado');
          cy.log('✅ Validação de email duplicado funcionando');
        });
      });
    });

    it('deve validar erro ao criar usuário com dados inválidos (teste negativo)', () => {
      const dadosInvalidos = {
        nome: '', // Nome vazio
        email: 'email-invalido', // Email inválido
        password: '123', // Senha muito curta
        administrador: 'invalid' // Valor inválido
      };

      ApiHelper.post('/usuarios', dadosInvalidos).then((response) => {
        expect(response.status).to.equal(400);
        // A API pode retornar diferentes mensagens de erro
        if (response.body.message) {
          expect(response.body.message).to.include('nome não pode ficar em branco');
          cy.log('✅ Validação de dados inválidos funcionando:', response.body.message);
        } else {
          // Se não tem message específica, pelo menos deve ter erro 400
          cy.log('✅ Validação de dados inválidos funcionando (erro 400)');
        }
      });
    });
  });
});
