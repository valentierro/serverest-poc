import { BasePage } from './BasePage';

export class PaginaCadastro extends BasePage {
  private readonly seletores = {
    campoNome: 'input[name="nome"]',
    campoEmail: 'input[name="email"]',
    campoSenha: 'input[name="password"]',
    checkboxAdministrador: 'input[name="administrador"]',
    botaoCadastrar: 'button[type="submit"]',
    formulario: 'form',
    linkLogin: 'a[href*="login"]'
  };

  constructor() {
    super('/cadastrarusuarios');
  }

  /**
   * Navegar para página de cadastro
   */
  visitarPaginaCadastro(): void {
    this.visitar();
  }

  /**
   * Preencher campo nome
   */
  preencherNome(nome: string): void {
    this.digitarTexto(this.obterElemento(this.seletores.campoNome), nome);
  }

  /**
   * Preencher campo email
   */
  preencherEmail(email: string): void {
    this.digitarTexto(this.obterElemento(this.seletores.campoEmail), email);
  }

  /**
   * Preencher campo senha
   */
  preencherSenha(senha: string): void {
    this.digitarTexto(this.obterElemento(this.seletores.campoSenha), senha);
  }

  /**
   * Marcar checkbox administrador
   */
  marcarAdministrador(): void {
    this.obterElemento(this.seletores.checkboxAdministrador).check();
  }

  /**
   * Desmarcar checkbox administrador
   */
  desmarcarAdministrador(): void {
    this.obterElemento(this.seletores.checkboxAdministrador).uncheck();
  }

  /**
   * Clicar no botão cadastrar
   */
  clicarCadastrar(): void {
    this.clicarElemento(this.obterElemento(this.seletores.botaoCadastrar));
  }

  /**
   * Clicar no link de login
   */
  clicarLinkLogin(): void {
    this.clicarElemento(this.obterElemento(this.seletores.linkLogin));
  }

  /**
   * Realizar cadastro completo
   */
  realizarCadastro(nome: string, email: string, senha: string, ehAdministrador: boolean = false): void {
    this.preencherNome(nome);
    this.preencherEmail(email);
    this.preencherSenha(senha);
    
    if (ehAdministrador) {
      this.marcarAdministrador();
    }
    
    this.clicarCadastrar();
  }

  /**
   * Verificar se página carregou corretamente
   */
  verificarPaginaCarregou(): void {
    this.aguardarUrlContem('/cadastrarusuarios');
    this.aguardarElementoVisivel(this.obterElemento(this.seletores.formulario));
  }

  /**
   * Verificar se formulário está visível
   */
  verificarFormularioVisivel(): void {
    this.aguardarElementoVisivel(this.obterElemento(this.seletores.formulario));
    this.aguardarElementoVisivel(this.obterElemento(this.seletores.campoNome));
    this.aguardarElementoVisivel(this.obterElemento(this.seletores.campoEmail));
    this.aguardarElementoVisivel(this.obterElemento(this.seletores.campoSenha));
    this.aguardarElementoVisivel(this.obterElemento(this.seletores.botaoCadastrar));
  }


  /**
   * Verificar redirecionamento pós cadastro
   */
  verificarRedirecionamentoPosCadastro(): void {
    cy.url().should('satisfy', (url) => {
      return url.includes('/home') || url.includes('/produtos') || url.includes('/minhaListaDeProdutos') || url.includes('/login');
    });
  }
}
