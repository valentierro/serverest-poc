# Configurações de Ambiente

Este projeto suporta execução de testes em diferentes ambientes (dev, stg, prod) tanto para testes de UI quanto de API.

## 📁 Estrutura de Configurações

```
cypress/configs/
├── index.ts                    # Configuração principal e funções utilitárias
├── ui/                         # Configurações para testes de UI
│   ├── dev.config.ts          # Ambiente de desenvolvimento
│   ├── stg.config.ts          # Ambiente de staging
│   └── prod.config.ts         # Ambiente de produção
└── api/                        # Configurações para testes de API
    ├── dev.config.ts          # Ambiente de desenvolvimento
    ├── stg.config.ts          # Ambiente de staging
    └── prod.config.ts         # Ambiente de produção
```

## 🚀 Como Usar

### 1. Executar Testes por Ambiente

#### Testes de UI
```bash
# Desenvolvimento
npm run test:ui:dev

# Staging
npm run test:ui:stg

# Produção
npm run test:ui:prod
```

#### Testes de API
```bash
# Desenvolvimento
npm run test:api:dev

# Staging
npm run test:api:stg

# Produção
npm run test:api:prod
```

#### Todos os Testes
```bash
# Desenvolvimento
npm run test:dev

# Staging
npm run test:stg

# Produção
npm run test:prod
```

### 2. Usar Configurações nos Testes

```typescript
import { getConfig } from '../../configs';

describe('Meu Teste', () => {
  it('deve usar configuração de ambiente', () => {
    const config = getConfig('ui'); // ou 'api'
    
    cy.visit(config.baseUrl);
    cy.log(`Executando no ambiente: ${config.environment}`);
  });
});
```

### 3. Configuração Automática

O ambiente é determinado pela variável `CYPRESS_ENV`:
- Se não definida, usa `dev` como padrão
- Pode ser definida nos scripts npm ou diretamente no terminal

```bash
# Definir ambiente manualmente
CYPRESS_ENV=stg npm run test:api
```

## ⚙️ Configurações por Ambiente

### Desenvolvimento (dev)
- **URL**: `https://front.serverest.dev`
- **Timeout**: 10 segundos
- **Debug**: Habilitado
- **Video**: Desabilitado

### Staging (stg)
- **URL**: `https://stg-front.serverest.dev`
- **Timeout**: 15 segundos
- **Debug**: Desabilitado
- **Video**: Habilitado

### Produção (prod)
- **URL**: `https://prod-front.serverest.dev`
- **Timeout**: 20 segundos
- **Debug**: Desabilitado
- **Video**: Habilitado
- **Viewport**: 1920x1080

## 🔧 Personalização

### Adicionar Novo Ambiente

1. Criar arquivo de configuração:
```typescript
// cypress/configs/ui/qa.config.ts
export const qaConfig = {
  baseUrl: 'https://qa-front.serverest.dev',
  environment: 'qa',
  // ... outras configurações
};
```

2. Atualizar `cypress/configs/index.ts`:
```typescript
export const uiConfigs: Record<Environment, Config> = {
  dev: devConfig,
  stg: stgConfig,
  prod: prodConfig,
  qa: qaConfig  // Adicionar novo ambiente
};
```

3. Adicionar scripts no `package.json`:
```json
{
  "test:qa": "CYPRESS_ENV=qa cypress run",
  "test:api:qa": "CYPRESS_ENV=qa cypress run --spec 'cypress/e2e/api/**/*'"
}
```

### Modificar Configurações Existentes

Edite os arquivos de configuração correspondentes:
- `cypress/configs/ui/{ambiente}.config.ts` para UI
- `cypress/configs/api/{ambiente}.config.ts` para API

## 📊 Variáveis de Ambiente Disponíveis

As configurações são expostas como variáveis de ambiente do Cypress:

- `Cypress.env('apiUrl')` - URL da API
- `Cypress.env('environment')` - Nome do ambiente
- `Cypress.env('debug')` - Modo debug habilitado

## 🎯 Exemplos Práticos

### Teste com Dados Específicos do Ambiente
```typescript
it('deve usar dados de teste do ambiente', () => {
  const apiConfig = getConfig('api');
  const testUser = apiConfig.testData?.users?.validUser;
  
  if (testUser) {
    cy.request('POST', `${apiConfig.baseUrl}/usuarios`, testUser);
  }
});
```

### Teste com Timeout Dinâmico
```typescript
it('deve aguardar resposta com timeout do ambiente', () => {
  const config = getConfig('api');
  
  cy.request({
    method: 'GET',
    url: `${config.baseUrl}/usuarios`,
    timeout: config.timeout.default
  });
});
```

### Teste com Headers Específicos
```typescript
it('deve usar headers do ambiente', () => {
  const config = getConfig('api');
  
  cy.request({
    method: 'GET',
    url: `${config.baseUrl}/usuarios`,
    headers: config.headers
  });
});
```

## 🔍 Debugging

Para verificar qual configuração está sendo usada:

```typescript
before(() => {
  const config = getConfig('ui');
  cy.log(`Ambiente: ${config.environment}`);
  cy.log(`URL: ${config.baseUrl}`);
  cy.log(`Debug: ${config.features.debug}`);
});
```

## 📝 Notas Importantes

1. **URLs de Exemplo**: As URLs nos arquivos de configuração são exemplos. Substitua pelas URLs reais dos seus ambientes.

2. **Dados de Teste**: Os dados de teste são específicos por ambiente. Certifique-se de que existem nos ambientes correspondentes.

3. **Timeouts**: Configure timeouts apropriados para cada ambiente (desenvolvimento pode ser mais rápido que produção).

4. **Segurança**: Nunca commite credenciais reais nos arquivos de configuração. Use variáveis de ambiente ou arquivos `.env` para dados sensíveis.
