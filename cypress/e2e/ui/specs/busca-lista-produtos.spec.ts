import { PaginaCadastro } from '../pages/PaginaCadastro';
import { PaginaHome } from '../pages/PaginaHome';
import { PaginaListaCompras } from '../pages/PaginaListaCompras';

describe('Testes de Busca e Lista de Produtos', () => {
  let paginaCadastro: PaginaCadastro;
  let paginaHome: PaginaHome;
  let paginaListaCompras: PaginaListaCompras;
  
  // Variáveis para armazenar dados do usuário criado
  let nomeUsuario: string;
  let emailUsuario: string;
  let senhaUsuario: string;

  before(() => {
    // Gerar dados aleatórios usando Faker
    cy.generateRandomUser().then((userData) => {
      nomeUsuario = userData.nome;
      emailUsuario = userData.email;
      senhaUsuario = userData.password;
      
      // Criar usuário apenas uma vez para todo o spec
      paginaCadastro = new PaginaCadastro();
      paginaCadastro.visitarPaginaCadastro();
      paginaCadastro.realizarCadastro(nomeUsuario, emailUsuario, senhaUsuario);
      
      // Aguardar mensagem de sucesso do cadastro
      cy.get('body').then(($body) => {
        const successMessage = $body.find('.alert-success, .success, [class*="success"]');
        if (successMessage.length > 0) {
          cy.log('✅ Usuário criado com sucesso');
          cy.wrap(successMessage).should('be.visible');
        }
      });
      
      // Aguardar login automático após cadastro
      cy.wait(3000);
      
      // Verificar se foi redirecionado automaticamente
      cy.url().then((currentUrl) => {
        if (currentUrl.includes('/login')) {
          // Fazer login manual se necessário
          cy.get('input[name="email"]').type(emailUsuario);
          cy.get('input[name="password"]').type(senhaUsuario);
          cy.get('button[type="submit"]').click();
          cy.wait(3000);
        }
      });
    });
  });

  beforeEach(() => {
    // Fazer login antes de cada teste
    cy.visit('/login');
    cy.get('input[name="email"]').type(emailUsuario);
    cy.get('input[name="password"]').type(senhaUsuario);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    
    paginaHome = new PaginaHome();
    paginaListaCompras = new PaginaListaCompras();
  });

  describe('Busca e Lista de Produtos', () => {
    it('deve permitir buscar produtos por nome', () => {
      const termoBusca = 'Logitech';

      // Interceptar requisições
      cy.intercept('POST', '**/login').as('loginRequest');
      cy.intercept('GET', '**/produtos').as('produtosRequest');
      cy.intercept('GET', '**/produtos*').as('buscaRequest');

      // Navegar para home
      paginaHome.visitarPaginaHome();
      paginaHome.verificarPaginaCarregou();

      // Realizar busca de produtos
      paginaHome.realizarBuscaProduto(termoBusca);
      
      // Aguardar resultado da busca
      cy.wait('@buscaRequest', { timeout: 10000 });
      
      // Verificar se há resultados da busca
      paginaHome.verificarResultadoBusca(termoBusca);
    });

    it('deve permitir adicionar produto à lista e validar na Lista de Compras', () => {
      // Interceptar requisições
      cy.intercept('POST', '**/login').as('loginRequest');
      cy.intercept('GET', '**/produtos').as('produtosRequest');

      // Navegar para home
      paginaHome.visitarPaginaHome();
      paginaHome.verificarPaginaCarregou();
      
      // Aguardar produtos carregarem
      cy.wait('@produtosRequest', { timeout: 10000 });

      // Adicionar primeiro produto à lista
      paginaHome.adicionarPrimeiroProdutoALista();
      
      // Aguardar ação ser processada
      cy.wait(2000);
      
      // Navegar para Lista de Compras
      paginaListaCompras.visitarListaCompras();
      paginaListaCompras.verificarPaginaCarregou();
      
      // Verificar se produto está na lista
      paginaListaCompras.verificarProdutoNaLista();
    });
  });
});