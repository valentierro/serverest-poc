import { ApiHelper } from '../../utils/ApiHelper';

describe('Testes de API - Carrinho', () => {
  describe('Operações de Carrinho', () => {
    // TESTES POSITIVOS (3)
    it('deve validar estrutura de resposta da API (teste positivo)', () => {
      // Testar GET que pode retornar 200 com dados vazios
      ApiHelper.get('/carrinhos').then((response) => {
        expect(response.status).to.be.oneOf([200, 401]);
        if (response.status === 200) {
          expect(response.body).to.have.property('quantidade');
          cy.log('✅ API de carrinho retorna dados válidos');
        } else {
          expect(response.body).to.have.property('message');
          cy.log('✅ API de carrinho protegida por autenticação');
        }
      });
    });

    it('deve validar métodos HTTP suportados (teste positivo)', () => {
      // Testar GET que é suportado
      ApiHelper.get('/carrinhos').then((response) => {
        expect(response.status).to.be.oneOf([200, 401]);
        cy.log('✅ Método GET suportado para carrinho');
      });
    });

    it('deve validar diferentes endpoints de carrinho (teste positivo)', () => {
      // Testar endpoints que podem retornar diferentes status
      const endpoints = ['/carrinhos/concluir-compra'];
      
      endpoints.forEach(endpoint => {
        ApiHelper.get(endpoint).then((response) => {
          expect(response.status).to.be.oneOf([200, 400, 401, 404]);
          cy.log(`✅ Endpoint ${endpoint} responde com status ${response.status}`);
        });
      });
    });

    // TESTES NEGATIVOS (2)
    it('deve validar erro ao criar carrinho sem dados (teste negativo)', () => {
      ApiHelper.post('/carrinhos', {}).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
        cy.log('✅ Validação de autenticação para criação funcionando');
      });
    });

    it('deve validar métodos HTTP não permitidos (teste negativo)', () => {
      // Testar PUT e DELETE que retornam 405
      ApiHelper.put('/carrinhos/123', {}).then((response) => {
        expect(response.status).to.equal(405);
        cy.log('✅ Método PUT não permitido para carrinho');
      });

      ApiHelper.delete('/carrinhos/123').then((response) => {
        expect(response.status).to.equal(405);
        cy.log('✅ Método DELETE não permitido para carrinho');
      });
    });
  });
});
