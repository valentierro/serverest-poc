# Cypress TypeScript POM Testing Framework

Um framework de testes Cypress construído com TypeScript e padrão Page Object Model (POM) para testes de UI e API, focado no Serverest.

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
│   │   ├── api/                 # Arquivos de testes API
│   │   │   ├── usuarios.spec.ts
│   │   │   ├── produtos.spec.ts
│   │   │   └── carrinho.spec.ts
│   │   └── ui/                  # Arquivos de testes UI
│   │       ├── busca-lista-produtos.spec.ts
│   │       ├── cadastro-usuario.spec.ts
│   │       ├── login-usuario.spec.ts
│   │       └── pages/           # Classes Page Object Model
│   │           ├── BasePage.ts
│   │           ├── PaginaCadastro.ts
│   │           ├── PaginaLogin.ts
│   │           ├── PaginaHome.ts
│   │           └── PaginaListaCompras.ts
│   ├── support/                 # Arquivos de suporte
│   │   ├── commands.ts
│   │   └── e2e.ts
│   ├── utils/                   # Classes utilitárias
│   │   └── ApiHelper.ts
│   ├── configs/                 # Configurações de ambiente
│   │   ├── index.ts
│   │   ├── ui/                  # Configurações UI por ambiente
│   │   └── api/                 # Configurações API por ambiente
│   ├── downloads/              # Arquivos baixados
│   ├── screenshots/            # Screenshots dos testes
│   └── videos/                 # Vídeos dos testes
├── cypress.config.ts           # Configuração Cypress
├── tsconfig.json              # Configuração TypeScript
├── package.json               # Dependências e scripts
└── README.md                  # Este arquivo
```

## 🛠️ Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd cypress-poc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Open Cypress Test Runner**
   ```bash
   npm run cypress:open
   ```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
# or
npm run cypress:run
```

### Run UI Tests Only
```bash
npm run test:busca-lista       # Teste de Busca e Lista de Produtos
npm run test:cadastro          # Teste de Cadastro de Usuário
npm run test:login             # Teste de Login de Usuário
```

### Run API Tests Only
```bash
npm run test:api               # Todos os testes de API
npm run test:api:usuarios      # Testes de usuários
npm run test:api:produtos      # Testes de produtos
npm run test:api:carrinho      # Testes de carrinho
```

### Run All Tests
```bash
npm run test:todos             # Todos os testes (UI + API)
npm run test:todos:headed      # Todos os testes em modo headed
```

### Run Tests by Environment
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

### Run Tests in Specific Browser
```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

### Open Cypress Test Runner
```bash
npm run test:open
# or
npm run cypress:open
```

## 📝 Writing Tests

### Page Object Model (POM)

The framework uses the Page Object Model pattern for better maintainability:

```typescript
// pages/HomePage.ts
export class HomePage extends BasePage {
  private readonly selectors = {
    header: 'h1',
    loginButton: '[data-testid="login-button"]'
  };

  clickLoginButton(): void {
    this.clickElement(this.getElement(this.selectors.loginButton));
  }
}

// e2e/ui/home.spec.ts
describe('Home Page Tests', () => {
  let homePage: HomePage;

  beforeEach(() => {
    homePage = new HomePage();
  });

  it('should navigate to login page', () => {
    homePage.visitHomePage();
    homePage.clickLoginButton();
    cy.url().should('include', '/login');
  });
});
```

### API Testing

Use the ApiHelper class for API testing:

```typescript
// e2e/api/users.spec.ts
import { ApiHelper } from '../../utils/ApiHelper';

describe('API Tests', () => {
  let apiHelper: ApiHelper;

  before(() => {
    apiHelper = new ApiHelper();
  });

  it('should fetch users', () => {
    apiHelper.get('/users').then((response) => {
      apiHelper.verifyStatusCode(response, 200);
      apiHelper.verifyResponseIsArray(response);
    });
  });
});
```

### Custom Commands

Use custom commands for common operations:

```typescript
// Custom commands available:
cy.getByTestId('submit-button');
cy.login('user@example.com', 'password123');
cy.generateRandomEmail();
cy.generateRandomString(10);
```

## ⚙️ Configuration

### Cypress Configuration (`cypress.config.ts`)

```typescript
export default defineConfig({
  e2e: {
    baseUrl: 'https://example.cypress.io',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    env: {
      apiUrl: 'https://jsonplaceholder.typicode.com'
    }
  }
});
```

### TypeScript Configuration (`tsconfig.json`)

The project includes proper TypeScript configuration with:
- Strict type checking
- Cypress and Node.js type definitions
- ES5 target for compatibility

## 🎯 Test Categories

### UI Tests (`cypress/e2e/ui/`)
- **Home Page Tests**: Navigation, responsiveness, performance
- **Login Page Tests**: Form validation, authentication flow, accessibility
- **Serverest Tests**: Real-world application testing with Serverest

### API Tests (`cypress/e2e/api/`)
- **Users API**: CRUD operations, error handling, performance
- **Posts API**: Data validation, integration tests, security

### Serverest Integration
The framework includes specific tests for the [Serverest application](https://front.serverest.dev/login):
- **Login Page**: Form validation, user interactions, responsiveness
- **Register Page**: User registration flow, form validation
- **Real-world Testing**: Tests against a live application for realistic scenarios

## 🔧 Utilities

### BasePage Class
- Common page interactions
- Element selection methods
- Assertion helpers
- Screenshot capabilities

### ApiHelper Class
- HTTP method wrappers (GET, POST, PUT, PATCH, DELETE)
- Response validation methods
- Performance testing utilities
- Header management

### Custom Commands
- `getByTestId()`: Select elements by data-testid
- `login()`: Session-based login
- `generateRandomEmail()`: Generate test emails
- `generateRandomString()`: Generate random strings

## 📊 Best Practices

1. **Use Page Object Model**: Keep page logic separate from test logic
2. **Data-Driven Testing**: Use fixtures for test data
3. **Custom Commands**: Create reusable commands for common operations
4. **Type Safety**: Leverage TypeScript for better code quality
5. **Test Organization**: Separate UI and API tests
6. **Error Handling**: Implement proper error handling in tests
7. **Performance Testing**: Include response time validations
8. **Accessibility**: Test ARIA attributes and keyboard navigation

## 🐛 Debugging

### View Test Results
- Screenshots are saved in `cypress/screenshots/`
- Videos are saved in `cypress/videos/` (if enabled)
- Download files are saved in `cypress/downloads/`

### Debug Mode
```bash
# Run specific test file
npx cypress run --spec "cypress/e2e/ui/home.spec.ts"

# Run with debug output
DEBUG=cypress:* npm run cypress:run
```

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for all new files
3. Add proper type definitions
4. Include comprehensive test coverage
5. Update documentation as needed

## 📄 License

This project is licensed under the ISC License.
