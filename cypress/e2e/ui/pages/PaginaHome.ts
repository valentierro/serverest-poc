import { BasePage } from './BasePage';

export class PaginaHome extends BasePage {
  private readonly seletores = {
    campoBusca: 'input[placeholder*="Pesquisar"], input[placeholder*="pesquisar"]'
  };

  constructor() {
    super('/home');
  }

  /**
   * Visitar página home
   */
  visitarPaginaHome(): void {
    this.visitar();
  }

  /**
   * Verificar se página home carregou
   */
  verificarPaginaCarregou(): void {
    this.aguardarUrlContem('/home');
    this.aguardarElementoVisivel(this.obterElemento('body'));
    this.aguardarElementoContemTexto(this.obterElemento('body'), 'Serverest Store');
  }

  /**
   * Realizar busca de produto
   */
  realizarBuscaProduto(termoBusca: string): void {
    this.obterElemento(this.seletores.campoBusca).then(($input) => {
      if ($input.length > 0) {
        cy.log('Encontrou campo de busca');
        cy.wrap($input.first()).type(termoBusca);
        
        // Clicar no botão de busca
        cy.get('button').contains('Pesquisar').click();
      } else {
        cy.log('Campo de busca não encontrado');
      }
    });
  }

  /**
   * Verificar resultado da busca
   */
  verificarResultadoBusca(termoBusca: string): void {
    cy.get('body').then(($body) => {
      const hasResults = $body.text().toLowerCase().includes(termoBusca.toLowerCase());
      if (hasResults) {
        cy.log('✅ Resultados da busca encontrados');
        this.aguardarElementoContemTexto(this.obterElemento('body'), termoBusca);
      } else {
        cy.log('Nenhum resultado encontrado para: ' + termoBusca);
        this.aguardarElementoVisivel(this.obterElemento('body'));
      }
    });
  }

  /**
   * Adicionar primeiro produto à lista
   */
  adicionarPrimeiroProdutoALista(): void {
    cy.get('button').contains('Adicionar a lista').first().then(($button) => {
      if ($button.length > 0) {
        cy.log('Encontrou botão "Adicionar a lista"');
        cy.wrap($button).click();
        cy.log('✅ Produto adicionado à lista');
      } else {
        cy.log('Não encontrou botão "Adicionar a lista"');
        throw new Error('Botão "Adicionar a lista" não encontrado');
      }
    });
  }

}
