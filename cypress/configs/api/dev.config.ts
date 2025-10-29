// Configuração para ambiente de desenvolvimento - API
export const devApiConfig = {
  baseUrl: 'https://serverest.dev',
  environment: 'development',
  timeout: {
    default: 10000,
    request: 10000,
    response: 10000
  },
  retries: {
    count: 2,
    delay: 1000
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  features: {
    debug: true,
    logging: true
  },
  testData: {
    users: {
      validUser: {
        nome: 'Usuario Dev Teste',
        email: 'usuario.dev@exemplo.com',
        password: 'senhaDev123456',
        administrador: 'true'
      }
    },
    products: {
      validProduct: {
        nome: 'Produto Dev Teste',
        preco: 100,
        descricao: 'Descrição do produto dev',
        quantidade: 10
      }
    }
  }
};
