
# Gerenciador de Tarefas — MERN Stack

Aplicação web para gerenciamento de tarefas, desenvolvida utilizando a stack MERN.

## Integrantes

- Juan Carlos Ribeiro Vieira
- João Pedro de Melo Bezerra

## Tecnologias utilizadas

### Back-end
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv

### Front-end
- React
- Vite
- React Router
- JavaScript
- CSS

## Funcionalidades

- Cadastro de usuários.
- Login com autenticação JWT.
- Criptografia de senhas utilizando bcrypt.
- Criação de tarefas.
- Listagem de tarefas.
- Edição de tarefas.
- Exclusão de tarefas.
- Alteração de status.
- Busca de tarefas.
- Filtro por tarefas pendentes e concluídas.
- Separação das tarefas por usuário.

## Estrutura do projeto

```text
gerenciador-de-tarefas-mern/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## Requisitos

- Node.js 20.19 ou superior.
- npm.
- Conta no MongoDB Atlas.
- Git.

## Instalação

### 1. Back-end

Entre na pasta:

```bash
cd backend
npm install
```

Crie o arquivo `.env`:

```env
MONGODB_URI=sua_string_de_conexao
JWT_SECRET=sua_chave_secreta
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Inicie o servidor:

```bash
npm run dev
```

### 2. Front-end

Em outro terminal:

```bash
cd frontend
npm install
```

Crie o arquivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Inicie a aplicação:

```bash
npm run dev
```

Acesse:

http://localhost:5173

## Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| POST | /api/auth/register | Cadastro |
| POST | /api/auth/login | Login |
| GET | /api/tasks | Listar tarefas |
| POST | /api/tasks | Criar tarefa |
| PUT | /api/tasks/:id | Atualizar tarefa |
| DELETE | /api/tasks/:id | Excluir tarefa |
| GET | /api/health | Verificar API |

## Segurança

- Senhas armazenadas com hash bcrypt.
- Autenticação utilizando JWT.
- Rotas de tarefas protegidas.
- Validação dos dados recebidos.
- CORS configurado.
- Variáveis sensíveis armazenadas em arquivos .env.
- Cada usuário acessa somente suas próprias tarefas.

## Banco de dados

O MongoDB armazena duas coleções principais:

- Users: informações dos usuários.
- Tasks: tarefas relacionadas aos usuários.

## Autores

Juan Carlos Ribeiro Vieira e João Pedro de Melo Bezerra.
