export class BasePage {
  protected url: string = '';

  constructor(url?: string) {
    if (url) {
      this.url = url;
    }
  }

  /**
   * Navegar para a URL da página
   */
  visitar(): void {
    cy.visit(this.url);
  }

  /**
   * Obter elemento por seletor CSS
   */
  protected obterElemento(seletor: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(seletor);
  }

  /**
   * Clicar em elemento
   */
  protected clicarElemento(elemento: Cypress.Chainable<JQuery<HTMLElement>>): void {
    elemento.click();
  }

  /**
   * Digitar texto no elemento
   */
  protected digitarTexto(elemento: Cypress.Chainable<JQuery<HTMLElement>>, texto: string): void {
    elemento.clear().type(texto);
  }

  /**
   * Aguardar elemento ficar visível
   */
  protected aguardarElementoVisivel(elemento: Cypress.Chainable<JQuery<HTMLElement>>): void {
    elemento.should('be.visible');
  }

  /**
   * Aguardar elemento conter texto específico
   */
  protected aguardarElementoContemTexto(elemento: Cypress.Chainable<JQuery<HTMLElement>>, texto: string): void {
    elemento.should('contain.text', texto);
  }

  /**
   * Aguardar URL conter texto específico
   */
  protected aguardarUrlContem(texto: string): void {
    cy.url().should('include', texto);
  }

  /**
   * Aguardar elemento ter valor específico
   */
  protected aguardarElementoTerValor(elemento: Cypress.Chainable<JQuery<HTMLElement>>, valor: string): void {
    elemento.should('have.value', valor);
  }

  /**
   * Aguardar elemento estar vazio
   */
  protected aguardarElementoVazio(elemento: Cypress.Chainable<JQuery<HTMLElement>>): void {
    elemento.should('have.value', '');
  }

  /**
   * Aguardar elemento estar marcado (checkbox)
   */
  protected aguardarElementoMarcado(elemento: Cypress.Chainable<JQuery<HTMLElement>>): void {
    elemento.should('be.checked');
  }

  /**
   * Aguardar elemento não estar marcado (checkbox)
   */
  protected aguardarElementoNaoMarcado(elemento: Cypress.Chainable<JQuery<HTMLElement>>): void {
    elemento.should('not.be.checked');
  }
}
