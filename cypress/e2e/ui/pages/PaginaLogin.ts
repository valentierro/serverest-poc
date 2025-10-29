import { BasePage } from './BasePage';

export class PaginaLogin extends BasePage {
  private readonly seletores = {
    campoEmail: 'input[name="email"]',
    campoSenha: 'input[name="password"]',
    botaoLogin: 'button[type="submit"]',
    formulario: 'form'
  };

  constructor() {
    super('/login');
  }

  /**
   * Visitar página de login
   */
  visitarPaginaLogin(): void {
    this.visitar();
  }

  /**
   * Verificar se página carregou corretamente
   */
  verificarPaginaCarregou(): void {
    this.aguardarUrlContem('/login');
    this.aguardarElementoVisivel(this.obterElemento(this.seletores.formulario));
  }

  /**
   * Preencher campo de email
   */
  preencherEmail(email: string): void {
    this.digitarTexto(this.obterElemento(this.seletores.campoEmail), email);
  }

  /**
   * Preencher campo de senha
   */
  preencherSenha(senha: string): void {
    this.digitarTexto(this.obterElemento(this.seletores.campoSenha), senha);
  }

  /**
   * Clicar no botão de login
   */
  clicarLogin(): void {
    this.clicarElemento(this.obterElemento(this.seletores.botaoLogin));
  }

  /**
   * Realizar login completo
   */
  realizarLogin(email: string, senha: string): void {
    this.preencherEmail(email);
    this.preencherSenha(senha);
    this.clicarLogin();
  }

  /**
   * Verificar redirecionamento para área logada
   */
  verificarRedirecionamentoAreaLogada(): void {
    cy.url().should('satisfy', (url) => {
      return url.includes('/home') || url.includes('/produtos') || url.includes('/minhaListaDeProdutos');
    });
  }

  /**
   * Verificar que permanece na página de login
   */
  verificarPermaneceNaPaginaLogin(): void {
    this.aguardarUrlContem('/login');
  }
}
