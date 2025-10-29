// Configuração para ambiente de staging - UI
export const stgConfig = {
  baseUrl: 'https://stg-front.serverest.dev',
  environment: 'staging',
  timeout: {
    default: 15000,
    request: 15000,
    response: 15000
  },
  viewport: {
    width: 1280,
    height: 720
  },
  features: {
    video: true,
    screenshot: true,
    debug: false
  },
  users: {
    testUser: {
      email: 'teste.stg@exemplo.com',
      password: 'senhaStg123456'
    }
  },
  api: {
    baseUrl: 'https://stg.serverest.dev',
    timeout: 15000
  }
};
