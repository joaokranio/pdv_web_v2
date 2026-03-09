# 📘 Framework de automação de testes E2E desenvolvido com Playwright + TypeScript, seguindo padrões de arquitetura escaláveis utilizados em projetos reais.

Este repositório contém o framework de automação de testes End-to-End (E2E) para o projeto PDV_WEB_V2. Desenvolvido com Playwright e TypeScript, o projeto utiliza padrões arquiteturais modernos para garantir testes escaláveis, sustentáveis e de alta performance.

## 🏗️ Arquitetura e Estrutura

O projeto segue o padrão Page Object Model (POM) e separa responsabilidades para facilitar a manutenção:
```
pdv_web_v2/ 
├── 📁 api/                         # Abstração de chamadas de API para setup/teardown.
├── 📁 tests/                       # Casos de teste organizados por contexto (Auth/Unauth).
├── 📁 pages/                       # Page Objects (Locators e Ações).
├── 📁 components/                  # Elementos globais reutilizáveis (Modais, Toasts, Header).
├── 📁 utils/                       # Helpers, gerenciamento de estados e variáveis de ambiente.
├── 📁 test-data/                   # Fixtures e massas de dados estáticas (JSON).
├── playwright.config.ts            # Configuração global do Playwright.
├── .env.example                    # Exemplo de variáveis de ambiente.
└── auth.json                       # Armazenamento de estado de autenticação (Storage State).
```
## 🛠️ Tecnologias Utilizadas
- Engine: Playwright
- Linguagem: TypeScript
- Relatórios: HTML Report / Allure Report
- Gerenciamento de Dados: JSON Fixtures
- Segurança: Dotenv para variáveis sensíveis

## 🚀 Como Começar
### Pré-requisitos
Antes de iniciar, você precisará ter instalado:
- Node.js (Versão 18 ou superior)
- VS Code (Recomendado)

### Instalação
Clone o repositório:
```bash
git clone https://github.com/seu-usuario/pdv-web-v2-automation.git
```
### Instalar as dependencias
```bash
npm install
```
### Instalar o Playwright
```bash
npx playwright install
```
### Configure as variáveis de ambiente:
- Copie o arquivo .env.example para um novo arquivo .env.
- Preencha as credenciais e URLs conforme necessário.

## 🧪 Cenários Automatizados
- Login de usuário
- Cadastro de cliente
- Criação de pedido
- Validação de mensagens
- Fluxo completo de venda

## 🧪 Executando os Testes
Você pode executar os testes de diferentes formas:

Executar todos os testes em modo Headless:
```bash
npx playwright test
```
Executar com interface visual (UI Mode):
```bash
npx playwright test --ui
```
Executar um arquivo de teste específico:
```bash 
npx playwright test tests/auth/login.spec.ts
```
Gerar e abrir o relatório de testes:
```bash
npx playwright show-report
```

## 💎 Boas Práticas Adotadas
- Isolamento de Testes: Cada teste é independente e limpa seu estado quando necessário.
- Data-Driven Testing: Uso de arquivos JSON na pasta test-data para validar múltiplos cenários.
- API Setup: Utilização de chamadas de API para criar massa de dados e agilizar o setup dos testes.
- Custom Assertions: Validações focadas no comportamento de negócio.
- Zero Flakiness: Evitamos waitForTimeout, priorizando auto-waiting e asserções web-first.

## 📂 Detalhes das Pastas
- tests/: Camada de negócio. Não contém seletores CSS/XPath.
- pages/: Camada técnica. Mapeia elementos e abstrai interações da UI.
- components/: Reduz a duplicidade em elementos que aparecem em múltiplas páginas.
- utils/: Funções de suporte, como geradores de CPF/CNPJ ou manipuladores de datas.

## 📄 Licença
- Este projeto está sob a licença MIT.

## ✨ Autor
- Desenvolvido por:<br>
**João Francisco Gonçalves** – [Linkedin](https://www.linkedin.com/in/joao-francisco-goncalves/)
