// Configuração para ambiente de staging - API
export const stgApiConfig = {
  baseUrl: 'https://stg.serverest.dev',
  environment: 'staging',
  timeout: {
    default: 15000,
    request: 15000,
    response: 15000
  },
  retries: {
    count: 3,
    delay: 2000
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Environment': 'staging'
  },
  features: {
    debug: false,
    logging: true
  },
  testData: {
    users: {
      validUser: {
        nome: 'Usuario Stg Teste',
        email: 'usuario.stg@exemplo.com',
        password: 'senhaStg123456',
        administrador: 'true'
      }
    },
    products: {
      validProduct: {
        nome: 'Produto Stg Teste',
        preco: 200,
        descricao: 'Descrição do produto staging',
        quantidade: 15
      }
    }
  }
};
