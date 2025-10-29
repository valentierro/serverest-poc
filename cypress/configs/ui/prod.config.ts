// Configuração para ambiente de produção - UI
export const prodConfig = {
  baseUrl: 'https://prod-front.serverest.dev',
  environment: 'production',
  timeout: {
    default: 20000,
    request: 20000,
    response: 20000
  },
  viewport: {
    width: 1920,
    height: 1080
  },
  features: {
    video: true,
    screenshot: true,
    debug: false
  },
  users: {
    testUser: {
      email: 'teste.prod@exemplo.com',
      password: 'senhaProd123456'
    }
  },
  api: {
    baseUrl: 'https://prod.serverest.dev',
    timeout: 20000
  }
};
