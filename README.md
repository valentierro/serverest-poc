# ServeRest POC - Testes Cypress

POC simples de testes automatizados com Cypress + TypeScript para a aplicação Serverest.

## 🚀 O que tem

- **Testes UI**: Cadastro, login e busca de produtos
- **Testes API**: Usuários, produtos e carrinho  
- **Page Object Model**: Código organizado e reutilizável
- **Multi-ambiente**: Dev, staging e produção
- **Português-BR**: Todos os testes em português brasileiro
- **Dados Aleatórios**: Uso do Faker para gerar dados de teste

## 📁 Estrutura

```
cypress-poc/
├── cypress/
│   ├── e2e/
│   │   ├── api/                    # 15 testes API (3 positivos + 2 negativos cada)
│   │   │   ├── usuarios.spec.ts
│   │   │   ├── produtos.spec.ts
│   │   │   └── carrinho.spec.ts
│   │   └── ui/                     # 8 testes UI
│   │       ├── cadastro-usuario.spec.ts    # 3 testes
│   │       ├── login-usuario.spec.ts       # 2 testes  
│   │       ├── busca-lista-produtos.spec.ts # 2 testes
│   │       └── pages/                       # Page Objects
│   │           ├── BasePage.ts
│   │           ├── PaginaCadastro.ts
│   │           ├── PaginaLogin.ts
│   │           ├── PaginaHome.ts
│   │           └── PaginaListaCompras.ts
│   ├── configs/                     # Configurações por ambiente
│   └── utils/
│       └── ApiHelper.ts             # Helper para API
├── cypress.config.ts
└── package.json
```

## 🛠️ Como usar

1. **Instalar**
   ```bash
   git clone https://github.com/valentierro/serverest-poc.git
   cd serverest-poc
   npm install
   ```

2. **Executar testes**
   ```bash
   # Todos os testes por ambiente
   npm run test:todos:dev
   npm run test:todos:stg
   npm run test:todos:prod
   
   # Todos testes de UI por ambiente
   npm run test:ui:dev
   npm run test:ui:stg
   npm run test:ui:prod
   
   # Todos testes de API por ambiente
   npm run test:api:dev
   npm run test:api:stg
   npm run test:api:prod
   ```

3. **Abrir Cypress**
   ```bash
   npm run cypress:open
   ```

## 📝 Como escrever testes

### Exemplo UI (Page Object)
```typescript
// pages/PaginaCadastro.ts
export class PaginaCadastro extends BasePage {
  private readonly selectors = {
    campoNome: '[data-testid="nome"]',
    campoEmail: '[data-testid="email"]',
    botaoCadastrar: '[data-testid="cadastrar"]'
  };

  preencherFormulario(nome: string, email: string): void {
    this.preencherCampo(this.selectors.campoNome, nome);
    this.preencherCampo(this.selectors.campoEmail, email);
  }

  clicarCadastrar(): void {
    this.clicarElemento(this.selectors.botaoCadastrar);
  }
}

// cadastro-usuario.spec.ts
describe('Cadastro de Usuário', () => {
  let paginaCadastro: PaginaCadastro;

  beforeEach(() => {
    paginaCadastro = new PaginaCadastro();
  });

  it('deve cadastrar usuário com sucesso', () => {
    // Gerar dados aleatórios com Faker
    cy.generateRandomUser().then((userData) => {
      paginaCadastro.visitarPagina();
      paginaCadastro.preencherFormulario(userData.nome, userData.email);
      paginaCadastro.clicarCadastrar();
      cy.contains('Cadastro realizado com sucesso').should('be.visible');
    });
  });
});
```

### Exemplo API
```typescript
// usuarios.spec.ts
import { ApiHelper } from '../../utils/ApiHelper';

describe('API Usuários', () => {
  let apiHelper: ApiHelper;

  before(() => {
    apiHelper = new ApiHelper();
  });

  it('deve criar usuário com sucesso', () => {
    // Gerar dados aleatórios com Faker
    cy.generateRandomUser().then((userData) => {
      const userPayload = {
        nome: userData.nome,
        email: userData.email,
        password: userData.password,
        administrador: 'true'
      };

      apiHelper.post('/usuarios', userPayload).then((response) => {
        apiHelper.verificarStatusCode(response, 201);
        apiHelper.verificarPropriedade(response, 'message', 'Cadastro realizado com sucesso');
      });
    });
  });
});
```

## ⚙️ Configuração

### Ambientes disponíveis
- **Dev**: `npm run test:dev`
- **Staging**: `npm run test:stg` 
- **Produção**: `npm run test:prod`

### Configurações por ambiente
As configurações ficam em `cypress/configs/` e incluem:
- URLs diferentes por ambiente
- Timeouts configuráveis
- Features habilitadas/desabilitadas

## 🎯 Testes incluídos

### UI (8 testes)
- **Cadastro**: 3 testes (1 negativo + 2 positivos)
- **Login**: 2 testes (1 positivo + 1 negativo)
- **Busca/Lista**: 2 testes (busca + adicionar à lista)

### API (15 testes)
- **Usuários**: 5 testes (3 positivos + 2 negativos)
- **Produtos**: 5 testes (3 positivos + 2 negativos)
- **Carrinho**: 5 testes (3 positivos + 2 negativos)

## 🔧 Boas práticas

1. **Use Page Object Model** - Lógica de página separada
2. **Intercepts** - Use `cy.intercept()` em vez de `cy.wait()`
3. **TypeScript** - Linguagem fortemente tipada
4. **Dados Aleatórios** - Use Faker para gerar dados únicos
5. **Comandos Customizados** - Use `cy.generateRandomUser()` para dados de teste

## 🐛 Debug

### Ver resultados
- Screenshots: `cypress/screenshots/`
- Vídeos: `cypress/videos/`
- Downloads: `cypress/downloads/`

### Comandos úteis
```bash
# Executar teste específico
npx cypress run --spec "cypress/e2e/ui/cadastro-usuario.spec.ts"

# Modo headed (ver navegador)
npm run test:cadastro:headed

# Debug
DEBUG=cypress:* npm run cypress:run
```

## 📚 Links úteis

- [Cypress Docs](https://docs.cypress.io/)
- [Serverest API](https://serverest.dev/)
- [Aplicação Serverest](https://front.serverest.dev/login)

## 📄 Licença

ISC License
