// Configuração principal para gerenciar ambientes
import { devConfig } from './ui/dev.config';
import { stgConfig } from './ui/stg.config';
import { prodConfig } from './ui/prod.config';
import { devApiConfig } from './api/dev.config';
import { stgApiConfig } from './api/stg.config';
import { prodApiConfig } from './api/prod.config';

export type Environment = 'dev' | 'stg' | 'prod';

export interface Config {
  baseUrl: string;
  environment: string;
  timeout: {
    default: number;
    request: number;
    response: number;
  };
  viewport?: {
    width: number;
    height: number;
  };
  features: {
    video: boolean;
    screenshot: boolean;
    debug: boolean;
    logging?: boolean;
  };
  users?: {
    testUser: {
      email: string;
      password: string;
    };
  };
  api?: {
    baseUrl: string;
    timeout: number;
  };
  retries?: {
    count: number;
    delay: number;
  };
  headers?: Record<string, string>;
  testData?: {
    users: {
      validUser: {
        nome: string;
        email: string;
        password: string;
        administrador: string;
      };
    };
    products: {
      validProduct: {
        nome: string;
        preco: number;
        descricao: string;
        quantidade: number;
      };
    };
  };
}

// Configurações UI por ambiente
export const uiConfigs: Record<Environment, Config> = {
  dev: devConfig,
  stg: stgConfig,
  prod: prodConfig
};

// Configurações API por ambiente
export const apiConfigs: Record<Environment, Config> = {
  dev: devApiConfig,
  stg: stgApiConfig,
  prod: prodApiConfig
};

// Função para obter configuração UI por ambiente
export function getUiConfig(environment: Environment): Config {
  return uiConfigs[environment];
}

// Função para obter configuração API por ambiente
export function getApiConfig(environment: Environment): Config {
  return apiConfigs[environment];
}

// Função para obter configuração baseada na variável de ambiente
export function getConfig(type: 'ui' | 'api', environment?: Environment): Config {
  const env = environment || (process.env.CYPRESS_ENV as Environment) || 'dev';
  
  if (type === 'ui') {
    return getUiConfig(env);
  } else {
    return getApiConfig(env);
  }
}

// Configuração padrão (dev)
export const defaultConfig = getConfig('ui', 'dev');
export const defaultApiConfig = getConfig('api', 'dev');
