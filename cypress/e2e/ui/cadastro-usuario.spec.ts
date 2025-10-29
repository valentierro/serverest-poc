import { PaginaCadastro } from './pages/PaginaCadastro';

describe('Testes de Cadastro de Usuário', () => {
  let paginaCadastro: PaginaCadastro;

  beforeEach(() => {
    paginaCadastro = new PaginaCadastro();
  });

  describe('Cadastro de Usuário', () => {
    it('deve validar campos obrigatórios e formato de email (teste negativo)', () => {
      const emailInvalido = 'email-invalido';
      const senhaCurta = '123';

      // Interceptar requisições
      cy.intercept('POST', '**/usuarios').as('cadastroRequest');

      paginaCadastro.visitarPaginaCadastro();
      paginaCadastro.verificarPaginaCarregou();

      // Tentar cadastrar sem preencher nada
      paginaCadastro.clicarCadastrar();

      // Verificar que formulário está visível
      paginaCadastro.verificarFormularioVisivel();

      // Preencher com dados inválidos
      paginaCadastro.preencherEmail(emailInvalido);
      paginaCadastro.preencherSenha(senhaCurta);
      paginaCadastro.clicarCadastrar();

      // Verificar que permanece na página de cadastro (dados inválidos)
      cy.url().should('include', '/cadastrarusuarios');
    });

    it('deve permitir cadastrar usuário comum com sucesso (teste positivo)', () => {
      const nomeUsuario = 'Usuario Comum ' + Date.now();
      const emailUsuario = `usuario.comum.${Date.now()}@exemplo.com`;
      const senhaUsuario = 'senha123456';

      // Interceptar requisições
      cy.intercept('POST', '**/usuarios').as('cadastroRequest');
      cy.intercept('POST', '**/login').as('loginRequest');

      paginaCadastro.visitarPaginaCadastro();
      paginaCadastro.verificarPaginaCarregou();

      // Realizar cadastro completo
      paginaCadastro.realizarCadastro(nomeUsuario, emailUsuario, senhaUsuario);

      // Aguardar requisição de cadastro
      cy.wait('@cadastroRequest', { timeout: 10000 });

      // Verificar redirecionamento (cadastro bem-sucedido)
      paginaCadastro.verificarRedirecionamentoPosCadastro();
    });

    it('deve permitir cadastrar usuário administrador com sucesso (teste positivo)', () => {
      const nomeUsuario = 'Admin ' + Date.now();
      const emailUsuario = `admin.${Date.now()}@exemplo.com`;
      const senhaUsuario = 'senhaAdmin123';

      // Interceptar requisições
      cy.intercept('POST', '**/usuarios').as('cadastroRequest');
      cy.intercept('POST', '**/login').as('loginRequest');

      paginaCadastro.visitarPaginaCadastro();
      paginaCadastro.verificarPaginaCarregou();

      // Realizar cadastro como administrador
      paginaCadastro.realizarCadastro(nomeUsuario, emailUsuario, senhaUsuario, true);

      // Aguardar requisição de cadastro
      cy.wait('@cadastroRequest', { timeout: 10000 });

      // Verificar redirecionamento (cadastro bem-sucedido)
      paginaCadastro.verificarRedirecionamentoPosCadastro();

      // Verificar redirecionamento (cadastro de admin bem-sucedido)
      cy.url().should('satisfy', (url) => {
        return url.includes('/home') || url.includes('/produtos') || url.includes('/minhaListaDeProdutos') || url.includes('/login');
      });
    });
  });
});
