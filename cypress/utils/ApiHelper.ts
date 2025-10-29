import { getConfig } from '../configs';

export class ApiHelper {
  private static readonly config = getConfig('api');
  private static readonly baseUrl = Cypress.env('apiUrl') || this.config.baseUrl;

  /**
   * Fazer requisição GET
   */
  static get(endpoint: string): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}${endpoint}`,
      failOnStatusCode: false
    });
  }

  /**
   * Fazer requisição POST
   */
  static post(endpoint: string, body: any): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}${endpoint}`,
      body: body,
      failOnStatusCode: false
    });
  }

  /**
   * Fazer requisição PUT
   */
  static put(endpoint: string, body: any): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}${endpoint}`,
      body: body,
      failOnStatusCode: false
    });
  }

  /**
   * Fazer requisição DELETE
   */
  static delete(endpoint: string): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}${endpoint}`,
      failOnStatusCode: false
    });
  }

  /**
   * Gerar dados de usuário aleatório
   */
  static gerarDadosUsuario(): any {
    const timestamp = Date.now();
    return {
      nome: `Usuario Teste ${timestamp}`,
      email: `usuario.teste.${timestamp}@exemplo.com`,
      password: 'senha123456',
      administrador: 'true'
    };
  }

  /**
   * Gerar dados de produto aleatório
   */
  static gerarDadosProduto(): any {
    const timestamp = Date.now();
    return {
      nome: `Produto Teste ${timestamp}`,
      preco: 100,
      descricao: `Descrição do produto teste ${timestamp}`,
      quantidade: 10
    };
  }

  /**
   * Verificar se resposta é bem-sucedida
   */
  static verificarSucesso(response: Cypress.Response<any>): void {
    expect(response.status).to.be.oneOf([200, 201]);
    // Nem todas as respostas têm message (ex: GET /usuarios)
    if (response.body.message) {
      expect(response.body).to.have.property('message');
    }
  }

  /**
   * Verificar se resposta é bem-sucedida para operações GET
   */
  static verificarSucessoGet(response: Cypress.Response<any>): void {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('quantidade');
  }

  /**
   * Verificar se resposta contém dados
   */
  static verificarDados(response: Cypress.Response<any>): void {
    expect(response.body).to.have.property('quantidade');
    expect(response.body).to.have.property('produtos');
    expect(response.body.produtos).to.be.an('array');
  }

  /**
   * Verificar estrutura de usuário
   */
  static verificarEstruturaUsuario(usuario: any): void {
    expect(usuario).to.have.property('_id');
    expect(usuario).to.have.property('nome');
    expect(usuario).to.have.property('email');
    expect(usuario).to.have.property('password');
    expect(usuario).to.have.property('administrador');
  }

  /**
   * Verificar estrutura de produto
   */
  static verificarEstruturaProduto(produto: any): void {
    expect(produto).to.have.property('_id');
    expect(produto).to.have.property('nome');
    expect(produto).to.have.property('preco');
    expect(produto).to.have.property('descricao');
    expect(produto).to.have.property('quantidade');
  }
}
