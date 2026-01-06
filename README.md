# 📘 Projeto de Automação de Testes – Playwright

Este repositório contém a estrutura padrão do projeto de **automação de testes utilizando Playwright**, seguindo boas práticas de mercado com foco em **organização, escalabilidade e fácil manutenção**.

A arquitetura foi pensada para separar claramente:

* Casos de teste
* Lógica de páginas (Page Object Model)
* Componentes reutilizáveis
* Serviços (API / backend)
* Utilitários e massa de dados

---

## 🧱 Estrutura de Pastas do Projeto

```text
playwright-project/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env
├── .env.example
├── .gitignore
│
├── tests/
│   ├── e2e/
│   │   ├── login.spec.ts
│   │   ├── cadastro.spec.ts
│   │   └── pedido.spec.ts
│   │
│   ├── api/
│   │   └── auth.api.spec.ts
│   │
│   └── regression/
│       └── fluxo-completo.spec.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   └── PedidoPage.ts
│
├── components/
│   ├── Toast.ts
│   ├── Modal.ts
│   └── Header.ts
│
├── fixtures/
│   └── testFixtures.ts
│
├── services/
│   ├── AuthService.ts
│   └── UsuarioService.ts
│
├── utils/
│   ├── env.ts
│   ├── dataFactory.ts
│   ├── dateHelper.ts
│   └── logger.ts
│
├── test-data/
│   ├── usuarios.json
│   └── produtos.json
│
├── reports/
│   ├── html/
│   └── allure/
│
├── screenshots/
├── videos/
│
└── README.md
```

---

## 📂 Descrição das Pastas

### 🔹 `tests/`

Contém **exclusivamente os casos de teste**. Os testes devem ser escritos em **linguagem de negócio**, sem implementação técnica de página.

* `e2e/` → Testes end-to-end
* `api/` → Testes de API
* `regression/` → Fluxos completos e regressivos

> ❗ Regra: **testes não devem conter locators nem lógica de interface**.

---

### 🔹 `pages/` (Page Object Model)

Responsável por encapsular:

* Locators
* Ações da tela
* Comportamentos específicos da página

Cada tela da aplicação deve possuir uma classe correspondente.

Benefícios:

* Centralização da manutenção
* Reuso
* Testes mais legíveis

---

### 🔹 `components/`

Armazena componentes reutilizáveis que aparecem em múltiplas telas, como:

* Toasts
* Modais
* Headers
* Menus

Evita duplicação de código e facilita manutenção de elementos globais.

---

### 🔹 `fixtures/`

Permite estender o objeto `test` do Playwright para:

* Login automático
* Setup de contexto
* Injeção de páginas prontas

Facilita o reaproveitamento de código e reduz duplicações em `beforeEach`.

---

### 🔹 `services/`

Responsável por regras de negócio e interações com backend/API, como:

* Autenticação via API
* Criação de massa de dados
* Setup rápido de cenários

Uso recomendado para tornar os testes **mais rápidos e estáveis**.

---

### 🔹 `utils/`

Funções auxiliares que não pertencem nem aos testes nem às páginas:

* Manipulação de datas
* Geração de dados dinâmicos
* Logs
* Leitura de variáveis de ambiente

---

### 🔹 `test-data/`

Armazena massas de dados estáticas em JSON, utilizadas em cenários previsíveis.

Exemplo:

* Usuários válidos
* Produtos cadastrados

---

### 🔹 `reports/`, `screenshots/`, `videos/`

Diretórios gerados automaticamente pelo Playwright:

* Evidências de execução
* Relatórios HTML / Allure

Essas pastas **não devem ser versionadas**.

---

## ⚙️ Arquivos Importantes

### `playwright.config.ts`

Arquivo central de configuração do projeto:

* Timeout
* Browsers
* Retries
* Evidências
* BaseURL

Nenhuma lógica de teste deve existir aqui.

---

### `.env` e `.env.example`

Armazena informações sensíveis e variáveis de ambiente.

Exemplo:

```env
BASE_URL=https://sistema.teste.com
USER_ADMIN=admin
PASSWORD_ADMIN=123456
```

> O arquivo `.env` deve estar no `.gitignore`.

---

### `.gitignore`

Ignora arquivos sensíveis e artefatos de execução:

```gitignore
.env
node_modules/
reports/
videos/
screenshots/
```

---

## 🧪 Boas Práticas Adotadas

* ✔ Testes focados em **fluxos**, não em cliques isolados
* ✔ Uso de **Page Object Model**
* ✔ Componentes reutilizáveis
* ✔ Dados sensíveis fora do repositório
* ✔ Preferência por API para preparação de cenários
* ✔ Evitar `waitForTimeout`
* ✔ Testes determinísticos

---

## ▶️ Execução dos Testes

```bash
npx playwright test
```

Relatório HTML:

```bash
npx playwright show-report
```

---

## 📌 Considerações Finais

Esta estrutura serve como **padrão base** para projetos de automação com Playwright e pode ser facilmente estendida para:

* Integração contínua (CI/CD)
* KPIs de qualidade
* Execuções paralelas
* Testes multi-ambiente

Manter a organização do projeto é fundamental para garantir **qualidade, produtividade e longevidade da automação**.
