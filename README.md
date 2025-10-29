# ServeRest POC - Cypress Testing Framework

Um framework de testes Cypress construído com TypeScript e padrão Page Object Model (POM) para testes de UI e API, focado no Serverest (https://front.serverest.dev).

## 🚀 Funcionalidades

- **Suporte TypeScript**: Configuração completa TypeScript com verificação de tipos
- **Page Object Model**: Objetos de página organizados para testes sustentáveis
- **Testes em Português-BR**: Testes escritos em português brasileiro
- **Testes UI e API**: Cobertura completa de testes de interface e API
- **Intercepts em vez de waits**: Uso de intercepts para aguardar requisições
- **Integração Serverest**: Testes contra aplicação real Serverest
- **Múltiplos Ambientes**: Suporte para dev, staging e produção
- **Configuração Dinâmica**: Configurações específicas por ambiente

## 📁 Estrutura do Projeto

```
cypress-poc/
├── cypress/
│   ├── e2e/
│   │   ├── api/                 # Testes de API Serverest
│   │   │   ├── usuarios.spec.ts     # 5 testes (3 positivos, 2 negativos)
│   │   │   ├── produtos.spec.ts     # 5 testes (3 positivos, 2 negativos)
│   │   │   └── carrinho.spec.ts     # 5 testes (3 positivos, 2 negativos)
│   │   └── ui/                  # Testes de UI Serverest
│   │       ├── busca-lista-produtos.spec.ts  # Busca e lista de produtos
│   │       ├── cadastro-usuario.spec.ts      # 3 testes (1 negativo, 2 positivos)
│   │       ├── login-usuario.spec.ts         # 2 testes (1 positivo, 1 negativo)
│   │       └── pages/           # Page Objects em português-BR
│   │           ├── BasePage.ts
│   │           ├── PaginaCadastro.ts
│   │           ├── PaginaLogin.ts
│   │           ├── PaginaHome.ts
│   │           └── PaginaListaCompras.ts
│   ├── support/                 # Arquivos de suporte
│   │   ├── commands.ts
│   │   └── e2e.ts
│   ├── utils/                   # Classes utilitárias
│   │   └── ApiHelper.ts         # Helper para testes de API
│   ├── configs/                 # Configurações multi-ambiente
│   │   ├── index.ts             # Carregador de configurações
│   │   ├── README.md            # Documentação das configurações
│   │   ├── ui/                  # Configurações UI por ambiente
│   │   │   ├── dev.config.ts
│   │   │   ├── stg.config.ts
│   │   │   └── prod.config.ts
│   │   └── api/                 # Configurações API por ambiente
│   │       ├── dev.config.ts
│   │       ├── stg.config.ts
│   │       └── prod.config.ts
│   ├── downloads/              # Arquivos baixados
│   ├── screenshots/            # Screenshots dos testes
│   └── videos/                 # Vídeos dos testes
├── cypress.config.ts           # Configuração principal Cypress
├── tsconfig.json              # Configuração TypeScript
├── package.json               # Dependências e scripts
├── .gitignore                 # Arquivos ignorados pelo Git
└── README.md                  # Este arquivo
```

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/valentierro/serverest-poc.git
   cd serverest-poc
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Abra o Cypress Test Runner**
   ```bash
   npm run cypress:open
   ```

## 🧪 Executando Testes

### Executar Todos os Testes
```bash
npm test
# ou
npm run cypress:run
```

### Executar Apenas Testes UI
```bash
npm run test:busca-lista       # Teste de Busca e Lista de Produtos
npm run test:cadastro          # Teste de Cadastro de Usuário (3 testes)
npm run test:login             # Teste de Login de Usuário (2 testes)
```

### Executar Apenas Testes API
```bash
npm run test:api               # Todos os testes de API (15 testes)
npm run test:api:usuarios      # Testes de usuários (5 testes)
npm run test:api:produtos      # Testes de produtos (5 testes)
npm run test:api:carrinho      # Testes de carrinho (5 testes)
```

### Executar Todos os Testes
```bash
npm run test:todos             # Todos os testes (UI + API)
npm run test:todos:headed      # Todos os testes em modo headed
```

### Executar Testes por Ambiente
```bash
# Desenvolvimento
npm run test:dev               # Todos os testes em dev
npm run test:api:dev           # Testes de API em dev
npm run test:ui:dev            # Testes de UI em dev

# Staging
npm run test:stg               # Todos os testes em staging
npm run test:api:stg           # Testes de API em staging
npm run test:ui:stg            # Testes de UI em staging

# Produção
npm run test:prod              # Todos os testes em produção
npm run test:api:prod          # Testes de API em produção
npm run test:ui:prod           # Testes de UI em produção
```

### Executar Testes em Navegador Específico
```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

### Abrir Cypress Test Runner
```bash
npm run test:open
# ou
npm run cypress:open
```

## 📝 Escrevendo Testes

### Page Object Model (POM)

O framework utiliza o padrão Page Object Model para melhor manutenibilidade:

```typescript
// pages/PaginaCadastro.ts
export class PaginaCadastro extends BasePage {
  private readonly selectors = {
    campoNome: '[data-testid="nome"]',
    campoEmail: '[data-testid="email"]',
    campoPassword: '[data-testid="password"]',
    botaoCadastrar: '[data-testid="cadastrar"]'
  };

  preencherFormulario(nome: string, email: string, senha: string): void {
    this.preencherCampo(this.selectors.campoNome, nome);
    this.preencherCampo(this.selectors.campoEmail, email);
    this.preencherCampo(this.selectors.campoPassword, senha);
  }

  clicarCadastrar(): void {
    this.clicarElemento(this.selectors.botaoCadastrar);
  }
}

// e2e/ui/cadastro-usuario.spec.ts
describe('Testes de Cadastro de Usuário', () => {
  let paginaCadastro: PaginaCadastro;

  beforeEach(() => {
    paginaCadastro = new PaginaCadastro();
    cy.intercept('POST', '**/usuarios').as('cadastroRequest');
  });

  it('deve cadastrar usuário com sucesso', () => {
    paginaCadastro.visitarPagina();
    paginaCadastro.preencherFormulario('João Silva', 'joao@teste.com', '123456');
    paginaCadastro.clicarCadastrar();
    cy.wait('@cadastroRequest');
    cy.contains('Cadastro realizado com sucesso').should('be.visible');
  });
});
```

### Testes de API

Use a classe ApiHelper para testes de API:

```typescript
// e2e/api/usuarios.spec.ts
import { ApiHelper } from '../../utils/ApiHelper';

describe('Testes de API - Usuários', () => {
  let apiHelper: ApiHelper;

  before(() => {
    apiHelper = new ApiHelper();
  });

  it('deve criar um novo usuário com sucesso', () => {
    const userData = {
      nome: 'João Silva',
      email: 'joao@teste.com',
      password: '123456',
      administrador: 'true'
    };

    apiHelper.post('/usuarios', userData).then((response) => {
      apiHelper.verificarStatusCode(response, 201);
      apiHelper.verificarPropriedade(response, 'message', 'Cadastro realizado com sucesso');
      apiHelper.verificarPropriedade(response, '_id');
    });
  });
});
```

### Comandos Customizados

Use comandos customizados para operações comuns:

```typescript
// Comandos customizados disponíveis:
cy.getByTestId('submit-button');
cy.login('user@example.com', 'password123');
cy.generateRandomEmail();
cy.generateRandomString(10);
```

## ⚙️ Configuração

### Configuração Cypress (`cypress.config.ts`)

```typescript
import { defineConfig } from 'cypress'
import { getConfig } from './cypress/configs'

const config = getConfig('ui'); // Default para configuração UI

export default defineConfig({
  e2e: {
    baseUrl: config.baseUrl,
    viewportWidth: config.viewport?.width || 1280,
    viewportHeight: config.viewport?.height || 720,
    video: config.features.video,
    screenshotOnRunFailure: config.features.screenshot,
    defaultCommandTimeout: config.timeout.default,
    requestTimeout: config.timeout.request,
    responseTimeout: config.timeout.response,
    specPattern: 'cypress/e2e/**/*.spec.{js,ts}',
    env: {
      apiUrl: config.api?.baseUrl || 'https://serverest.dev',
      environment: config.environment,
      debug: config.features.debug
    }
  }
});
```

### Configuração TypeScript (`tsconfig.json`)

O projeto inclui configuração TypeScript adequada com:
- Verificação de tipos rigorosa
- Definições de tipos Cypress e Node.js
- Target ES5 para compatibilidade

## 🎯 Categorias de Testes

### Testes UI (`cypress/e2e/ui/`)
- **Cadastro de Usuário**: Validação de formulário, fluxo de cadastro, casos negativos
- **Login de Usuário**: Autenticação, validação de credenciais, casos de erro
- **Busca e Lista de Produtos**: Busca de produtos, adição à lista de compras

### Testes API (`cypress/e2e/api/`)
- **Usuários API**: Operações CRUD, tratamento de erros, performance
- **Produtos API**: Validação de dados, testes de integração, segurança
- **Carrinho API**: Operações de carrinho, validação de dados

### Integração Serverest
O framework inclui testes específicos para a aplicação [Serverest](https://front.serverest.dev/login):
- **Página de Login**: Validação de formulário, interações do usuário, responsividade
- **Página de Cadastro**: Fluxo de cadastro de usuário, validação de formulário
- **Testes Realistas**: Testes contra aplicação real para cenários realistas

## 🔧 Utilitários

### Classe BasePage
- Interações comuns de página
- Métodos de seleção de elementos
- Helpers de asserção
- Capacidades de screenshot

### Classe ApiHelper
- Wrappers de métodos HTTP (GET, POST, PUT, PATCH, DELETE)
- Métodos de validação de resposta
- Utilitários de teste de performance
- Gerenciamento de headers

### Comandos Customizados
- `getByTestId()`: Selecionar elementos por data-testid
- `login()`: Login baseado em sessão
- `generateRandomEmail()`: Gerar emails de teste
- `generateRandomString()`: Gerar strings aleatórias

## 📊 Boas Práticas

1. **Use Page Object Model**: Mantenha a lógica de página separada da lógica de teste
2. **Testes Orientados a Dados**: Use fixtures para dados de teste
3. **Comandos Customizados**: Crie comandos reutilizáveis para operações comuns
4. **Segurança de Tipos**: Aproveite o TypeScript para melhor qualidade de código
5. **Organização de Testes**: Separe testes UI e API
6. **Tratamento de Erros**: Implemente tratamento adequado de erros nos testes
7. **Testes de Performance**: Inclua validações de tempo de resposta
8. **Acessibilidade**: Teste atributos ARIA e navegação por teclado
9. **Intercepts**: Use intercepts em vez de waits estáticos
10. **Testes em Português-BR**: Mantenha consistência na linguagem dos testes

## 🐛 Debugging

### Visualizar Resultados dos Testes
- Screenshots são salvos em `cypress/screenshots/`
- Vídeos são salvos em `cypress/videos/` (se habilitado)
- Arquivos baixados são salvos em `cypress/downloads/`

### Modo Debug
```bash
# Executar arquivo de teste específico
npx cypress run --spec "cypress/e2e/ui/cadastro-usuario.spec.ts"

# Executar com saída de debug
DEBUG=cypress:* npm run cypress:run

# Executar em modo headed para visualizar
npm run test:cadastro:headed
```

## 📚 Recursos Adicionais

- [Documentação Cypress](https://docs.cypress.io/)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Padrão Page Object Model](https://martinfowler.com/bliki/PageObject.html)
- [Documentação Serverest API](https://serverest.dev/)
- [Aplicação Serverest](https://front.serverest.dev/login)

## 🤝 Contribuindo

1. Siga a estrutura de código existente
2. Use TypeScript para todos os novos arquivos
3. Adicione definições de tipos adequadas
4. Inclua cobertura abrangente de testes
5. Atualize a documentação conforme necessário
6. Mantenha os testes em português brasileiro
7. Use Page Object Model para novos testes UI
8. Siga as boas práticas estabelecidas

## 📄 Licença

Este projeto está licenciado sob a Licença ISC.
