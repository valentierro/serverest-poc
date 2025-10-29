import { PaginaLogin } from './pages/PaginaLogin';
import { PaginaCadastro } from './pages/PaginaCadastro';

describe('Testes de Login de Usuário', () => {
  let paginaLogin: PaginaLogin;
  let paginaCadastro: PaginaCadastro;
  
  // Dados do usuário criado uma única vez
  const nomeUsuario = 'Usuario Login Test';
  const emailUsuario = `usuario.login.${Date.now()}@exemplo.com`;
  const senhaUsuario = 'senhaLogin123';

  before(() => {
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

  beforeEach(() => {
    paginaLogin = new PaginaLogin();
  });

  describe('Login de Usuário', () => {
    it('deve permitir fazer login com credenciais válidas (teste positivo)', () => {
      // Interceptar requisições
      cy.intercept('POST', '**/login').as('loginRequest');

      paginaLogin.visitarPaginaLogin();
      paginaLogin.verificarPaginaCarregou();

      // Realizar login
      paginaLogin.realizarLogin(emailUsuario, senhaUsuario);

      // Aguardar requisição de login
      cy.wait('@loginRequest', { timeout: 10000 });

      // Verificar redirecionamento para área logada
      paginaLogin.verificarRedirecionamentoAreaLogada();
    });

    it('deve validar credenciais inválidas e exibir mensagem de erro (teste negativo)', () => {
      const emailInvalido = 'email.invalido@exemplo.com';
      const senhaInvalida = 'senhaErrada';

      // Interceptar requisições
      cy.intercept('POST', '**/login').as('loginRequest');

      paginaLogin.visitarPaginaLogin();
      paginaLogin.verificarPaginaCarregou();

      // Tentar login com credenciais inválidas
      paginaLogin.realizarLogin(emailInvalido, senhaInvalida);

      // Aguardar requisição de login
      cy.wait('@loginRequest', { timeout: 10000 });

      // Verificar que permanece na página de login (credenciais inválidas)
      paginaLogin.verificarPermaneceNaPaginaLogin();
    });
  });
});
