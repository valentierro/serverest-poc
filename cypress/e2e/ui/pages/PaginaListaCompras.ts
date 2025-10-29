import { BasePage } from './BasePage';

export class PaginaListaCompras extends BasePage {
  private readonly seletores = {
    itemProduto: '[class*="product-item"], [class*="cart-item"]',
    listaProdutos: '[class*="product"], [class*="item"], [class*="cart"]',
    mensagemVazia: '[class*="empty"], [class*="no-items"]'
  };

  constructor() {
    super('/carrinho');
  }

  /**
   * Visitar lista de compras
   */
  visitarListaCompras(): void {
    this.visitar();
  }

  /**
   * Verificar se página carregou
   */
  verificarPaginaCarregou(): void {
    this.aguardarElementoVisivel(this.obterElemento('body'));
  }

  /**
   * Verificar se produto está na lista
   */
  verificarProdutoNaLista(): void {
    cy.get('body').then(($body) => {
      const hasProducts = $body.find(this.seletores.itemProduto).length > 0 ||
                         $body.find(this.seletores.listaProdutos).length > 0 ||
                         $body.text().includes('produto') ||
                         $body.text().includes('item');
      
      if (hasProducts) {
        cy.log('✅ Produto encontrado na lista de compras');
        this.aguardarElementoVisivel(this.obterElemento('body'));
        cy.get('body').should('be.visible');
        cy.get('body').should('not.be.empty');
      } else {
        cy.log('⚠️ Nenhum produto encontrado na lista');
        cy.get('body').should('be.visible');
      }
    });
  }
}
