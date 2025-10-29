// Configuração para ambiente de produção - API
export const prodApiConfig = {
  baseUrl: 'https://prod.serverest.dev',
  environment: 'production',
  timeout: {
    default: 20000,
    request: 20000,
    response: 20000
  },
  retries: {
    count: 5,
    delay: 3000
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Environment': 'production'
  },
  features: {
    debug: false,
    logging: false
  },
  testData: {
    users: {
      validUser: {
        nome: 'Usuario Prod Teste',
        email: 'usuario.prod@exemplo.com',
        password: 'senhaProd123456',
        administrador: 'true'
      }
    },
    products: {
      validProduct: {
        nome: 'Produto Prod Teste',
        preco: 300,
        descricao: 'Descrição do produto produção',
        quantidade: 20
      }
    }
  }
};
