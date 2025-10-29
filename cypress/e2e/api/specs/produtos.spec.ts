import { ApiHelper } from "../../../utils/ApiHelper";

describe('Testes de API - Produtos', () => {
  describe('Operações de Produtos', () => {
    // TESTES POSITIVOS (3)
    it('deve buscar produtos existentes (teste positivo)', () => {
      ApiHelper.get('/produtos').then((response) => {
        ApiHelper.verificarSucessoGet(response);
        expect(response.body).to.have.property('produtos');
        expect(response.body.produtos).to.be.an('array');
        cy.log('✅ Produtos encontrados:', response.body.quantidade);
      });
    });

    it('deve buscar produto por ID específico (teste positivo)', () => {
      // Primeiro buscar produtos para obter um ID válido
      ApiHelper.get('/produtos').then((response) => {
        if (response.body.produtos.length > 0) {
          const primeiroProduto = response.body.produtos[0];
          const produtoId = primeiroProduto._id;
          
          // Buscar produto específico
          ApiHelper.get(`/produtos/${produtoId}`).then((produtoResponse) => {
            ApiHelper.verificarSucesso(produtoResponse);
            expect(produtoResponse.body).to.have.property('nome');
            expect(produtoResponse.body).to.have.property('preco');
            cy.log('✅ Produto encontrado:', produtoResponse.body.nome);
          });
        } else {
          cy.log('⚠️ Nenhum produto encontrado para teste');
        }
      });
    });

    it('deve validar estrutura de resposta de produtos (teste positivo)', () => {
      ApiHelper.get('/produtos').then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('quantidade');
        expect(response.body).to.have.property('produtos');
        
        if (response.body.produtos.length > 0) {
          const produto = response.body.produtos[0];
          ApiHelper.verificarEstruturaProduto(produto);
          cy.log('✅ Estrutura de produto validada');
        }
      });
    });

    // TESTES NEGATIVOS (2)
    it('deve validar erro ao buscar produto inexistente (teste negativo)', () => {
      ApiHelper.get('/produtos/produto_inexistente_123').then((response) => {
        expect(response.status).to.equal(400);
        // A API pode retornar diferentes estruturas de erro
        if (response.body.message) {
          expect(response.body).to.have.property('message');
          cy.log('✅ Validação de produto inexistente funcionando:', response.body.message);
        } else {
          // Se não tem message, pelo menos deve ter algum indicador de erro
          expect(response.body).to.have.property('id');
          cy.log('✅ Validação de produto inexistente funcionando (estrutura alternativa)');
        }
      });
    });

    it('deve validar erro ao acessar endpoint inválido (teste negativo)', () => {
      ApiHelper.get('/produtos/invalid-endpoint').then((response) => {
        expect(response.status).to.equal(400);
        cy.log('✅ Validação de endpoint inválido funcionando');
      });
    });
  });
});
