# 💰 React Native Wallet

Uma aplicação mobile completa de gestão financeira pessoal desenvolvida com React Native e Expo. Permite que usuários controlem suas finanças de forma simples e intuitiva, registrando receitas, despesas e acompanhando seu saldo em tempo real.

![App Screenshot](assets/screenshots/home-screen.png)
<!-- Adicione aqui uma imagem da tela principal do aplicativo -->

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como Usar](#-como-usar)
- [API Backend](#-api-backend)
- [Capturas de Tela](#-capturas-de-tela)

## 🎯 Sobre o Projeto

React Native Wallet é uma solução completa para gestão financeira pessoal, oferecendo uma interface moderna e intuitiva para controle de receitas e despesas. O aplicativo permite que usuários registrem transações financeiras, categorizem seus gastos e visualizem um resumo completo de suas finanças.

![App Features](assets/screenshots/features.png)
<!-- Adicione aqui uma imagem destacando as principais funcionalidades -->

## ✨ Funcionalidades

### 🔐 Autenticação
- **Cadastro de usuários** com verificação por email
- **Login seguro** utilizando Clerk Authentication
- **Proteção de rotas** com autenticação baseada em sessão

### 💵 Gestão de Transações
- **Criar transações** de receita ou despesa
- **Categorização** de transações (Alimentação, Transporte, Entretenimento, Contas, Compras, Renda, Outros)
- **Visualização** de todas as transações em lista
- **Exclusão** de transações com confirmação

### 📊 Dashboard Financeiro
- **Saldo total** atualizado em tempo real
- **Resumo de receitas** e despesas
- **Atualização automática** ao retornar para a tela principal
- **Pull-to-refresh** para atualização manual

![Dashboard](assets/screenshots/dashboard.png)
<!-- Adicione aqui uma imagem do dashboard com o card de saldo -->

## 🛠 Tecnologias Utilizadas

### Frontend (Mobile)
- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma e ferramentas para React Native
- **Expo Router** - Roteamento baseado em arquivos
- **TypeScript** - Tipagem estática
- **Clerk** - Autenticação e gerenciamento de usuários
- **React Navigation** - Navegação entre telas
- **Expo Vector Icons** - Biblioteca de ícones

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **PostgreSQL** (Neon) - Banco de dados relacional
- **Upstash Redis** - Rate limiting e cache
- **Cron Jobs** - Tarefas agendadas

### Ferramentas
- **ESLint** - Linter para qualidade de código
- **Nodemon** - Desenvolvimento com hot reload

## 📁 Estrutura do Projeto

```
react-native-wallet/
├── mobile/                 # Aplicativo React Native
│   ├── app/               # Rotas e telas (Expo Router)
│   │   ├── (auth)/       # Rotas de autenticação
│   │   └── (root)/       # Rotas protegidas
│   ├── components/        # Componentes reutilizáveis
│   ├── hooks/            # Custom hooks
│   ├── constants/        # Constantes e configurações
│   ├── styles/           # Estilos da aplicação
│   └── lib/              # Utilitários
│
└── backend/              # API Backend
    ├── src/
    │   ├── config/       # Configurações (DB, Redis, Cron)
    │   ├── controllers/  # Lógica de negócio
    │   ├── routes/       # Rotas da API
    │   └── middleware/   # Middlewares (rate limiting)
    └── server.js         # Servidor Express
```

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado:

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **PostgreSQL** (ou conta no Neon Database)
- **Conta no Clerk** (para autenticação)
- **Conta no Upstash** (para Redis/rate limiting)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/react-native-wallet.git
cd react-native-wallet
```

### 2. Instale as dependências do Backend

```bash
cd backend
npm install
```

### 3. Instale as dependências do Mobile

```bash
cd ../mobile
npm install
```

## ⚙️ Configuração

### Backend

1. Crie um arquivo `.env` na pasta `backend/`:

```env
DATABASE_URL=sua_url_do_postgresql
UPSTASH_REDIS_REST_URL=sua_url_do_upstash_redis
UPSTASH_REDIS_REST_TOKEN=seu_token_do_upstash
PORT=5001
NODE_ENV=development
```

2. Inicie o servidor:

```bash
cd backend
npm run dev
```

O servidor estará rodando em `http://localhost:5001`

### Mobile

1. Configure a URL da API em `mobile/constants/api.ts`:

```typescript
export const API_URL = "http://seu-ip-local:5001/api";
// Para desenvolvimento local, use seu IP local da rede
// Exemplo: "http://192.168.1.100:5001/api"
```

2. Configure as variáveis de ambiente do Clerk em `mobile/app.json` ou via Expo:

```bash
# Instale o Expo CLI globalmente se ainda não tiver
npm install -g expo-cli

# Configure as variáveis do Clerk
expo env:set CLERK_PUBLISHABLE_KEY=sua_chave_publica_do_clerk
```

3. Inicie o aplicativo:

```bash
cd mobile
npm start
```

![Setup](assets/screenshots/setup.png)
<!-- Adicione aqui uma imagem do processo de setup ou configuração -->

## 📱 Como Usar

### Primeiro Acesso

1. **Cadastre-se**: Toque em "Sign up" na tela inicial
2. **Verifique seu email**: Confirme o código enviado por email
3. **Faça login**: Entre com suas credenciais

![Auth Flow](assets/screenshots/auth-flow.png)
<!-- Adicione aqui imagens do fluxo de autenticação (login/signup) -->

### Criando uma Transação

1. Toque no botão **"Add"** no canto superior direito
2. Selecione o tipo: **Expense** (Despesa) ou **Income** (Receita)
3. Digite o valor da transação
4. Adicione um título descritivo
5. Selecione uma categoria
6. Toque em **"Save"** para salvar

![Create Transaction](assets/screenshots/create-transaction.png)
<!-- Adicione aqui uma imagem da tela de criação de transação -->

### Visualizando o Dashboard

- O **card de saldo** mostra seu saldo total, receitas e despesas
- A lista de **transações recentes** exibe todas as suas transações
- Arraste para baixo para **atualizar** os dados manualmente

### Excluindo uma Transação

1. Toque no ícone de **lixeira** ao lado da transação
2. Confirme a exclusão no diálogo

## 🔌 API Backend

### Endpoints Disponíveis

#### `GET /api/transactions/:userId`
Retorna todas as transações de um usuário.

**Resposta:**
```json
[
  {
    "id": 1,
    "user_id": "user_123",
    "title": "Almoço",
    "amount": -25.50,
    "category": "Food & Drinks",
    "created_at": "2024-01-15T12:00:00Z"
  }
]
```

#### `POST /api/transactions`
Cria uma nova transação.

**Body:**
```json
{
  "user_id": "user_123",
  "title": "Salário",
  "amount": 5000.00,
  "category": "Income"
}
```

#### `GET /api/transactions/summary/:userId`
Retorna o resumo financeiro do usuário.

**Resposta:**
```json
{
  "balance": 4750.00,
  "income": 5000.00,
  "expenses": -250.00
}
```

#### `DELETE /api/transactions/:id`
Exclui uma transação específica.

### Rate Limiting

A API possui rate limiting configurado via Upstash Redis para prevenir abuso.

## 📸 Capturas de Tela

### Tela Principal
![Home Screen](assets/screenshots/home-screen.jpeg)


### Tela de Criação
![Create Screen](assets/screenshots/create-screen.jpeg)
<!-- Adicione aqui a captura de tela da tela de criação -->

### Tela de Login
![Login Screen](assets/screenshots/login-screen.jpeg)
<!-- Adicione aqui a captura de tela da tela de login -->

### Tela de Cadastro
![Signup Screen](assets/screenshots/signup-screen.jpeg)
<!-- Adicione aqui a captura de tela da tela de cadastro -->

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu.email@exemplo.com

## 🙏 Agradecimentos

- [Expo](https://expo.dev/) pela plataforma incrível
- [Clerk](https://clerk.com/) pela autenticação simplificada
- [Neon](https://neon.tech/) pelo banco de dados PostgreSQL serverless
- [Upstash](https://upstash.com/) pelo Redis serverless

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
