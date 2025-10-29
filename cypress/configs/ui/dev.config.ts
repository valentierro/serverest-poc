// Configuração para ambiente de desenvolvimento - UI
export const devConfig = {
  baseUrl: 'https://front.serverest.dev',
  environment: 'development',
  timeout: {
    default: 10000,
    request: 10000,
    response: 10000
  },
  viewport: {
    width: 1280,
    height: 720
  },
  features: {
    video: false,
    screenshot: true,
    debug: true
  },
  users: {
    testUser: {
      email: 'teste@exemplo.com',
      password: 'senha123456'
    }
  },
  api: {
    baseUrl: 'https://serverest.dev',
    timeout: 10000
  }
};
