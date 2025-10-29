import { ApiHelper } from '../../../utils/ApiHelper';

describe('Testes de API - Carrinho', () => {
  describe('Operações de Carrinho', () => {
    // TESTES POSITIVOS (3)
    it('deve exigir autenticação ao listar carrinhos (retorna 401)', () => {
      ApiHelper.get('/carrinhos').then((response) => {
        expect(response.status).to.equal(401);
      });
    });

    it('deve retornar 401 ao acessar GET /carrinhos sem token', () => {
      ApiHelper.get('/carrinhos').then((response) => {
        expect(response.status).to.equal(401);
      });
    });

    it('deve retornar 401 ao acessar GET /carrinhos/concluir-compra sem token', () => {
      ApiHelper.get('/carrinhos/concluir-compra').then((response) => {
        expect(response.status).to.equal(401);
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

    it('deve retornar 405 ao tentar PUT em /carrinhos/ID', () => {
      ApiHelper.put('/carrinhos/123', {}).then((response) => {
        expect(response.status).to.equal(405);
      });
    });

    it('deve retornar 405 ao tentar DELETE em /carrinhos/ID', () => {
      ApiHelper.delete('/carrinhos/123').then((response) => {
        expect(response.status).to.equal(405);
      });
    });
  });
});
