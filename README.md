# Gerenciador de Tarefas — MERN Stack

Aplicação full-stack de gerenciamento de tarefas, com autenticação de usuários e CRUD de tarefas, construída com MongoDB, Express, React e Node.js.

## Tecnologias

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Frontend:** React (Vite), React Router

## Estrutura do projeto

```
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
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Pré-requisitos

- Node.js 20.19 ou superior
- Conta gratuita no MongoDB Atlas
- Git

## Instalação e configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/JP-77-uni/gerenciador-de-tarefas-mern.git
cd gerenciador-de-tarefas-mern
```

### 2. Configurar o backend

```bash
cd backend
npm install
```

Crie o arquivo `backend/.env` a partir do `.env.example`:

```env
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/gerenciador?retryWrites=true&w=majority
JWT_SECRET=uma-frase-longa-e-aleatoria
PORT=3000
```

Como obter a `MONGODB_URI`:

1. Crie um cluster gratuito no [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Em **Database & Network Access**, crie um usuário e uma senha.
3. Ainda em **Database & Network Access**, na lista de IPs, libere o IP `0.0.0.0/0` (apenas para desenvolvimento).
4. Em **Clusters > Connect > Drivers**, copie a connection string e substitua `<usuario>` e `<senha>`. Senhas com caracteres especiais precisam ser codificadas (por exemplo, `@` vira `%40`).

Inicie o servidor:

```bash
npm run dev
```

O backend ficará disponível em `http://localhost:3000`. O terminal deve mostrar `MongoDB conectado` e `Servidor iniciado`.

### 3. Configurar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em `http://localhost:5173`.

## Autenticação

As senhas são armazenadas com hash (bcrypt). O login retorna um token JWT, que deve ser enviado no header das rotas protegidas:

```
Authorization: Bearer <token>
```

## Endpoints

| Método | Rota | Descrição | Protegida |
|--------|------|-----------|-----------|
| POST | `/api/auth/register` | Cria um novo usuário | Não |
| POST | `/api/auth/login` | Autentica e retorna um token | Não |
| GET | `/api/tasks` | Lista as tarefas do usuário | Sim |
| POST | `/api/tasks` | Cria uma nova tarefa | Sim |
| PUT | `/api/tasks/:id` | Atualiza uma tarefa | Sim |
| DELETE | `/api/tasks/:id` | Remove uma tarefa | Sim |

### Modelo da tarefa

| Campo | Tipo | Regras |
|-------|------|--------|
| `title` | String | Obrigatório, até 100 caracteres |
| `description` | String | Opcional, até 500 caracteres, padrão `""` |
| `status` | String | `pendente` (padrão) ou `concluída` |
| `user` | ObjectId | Definido automaticamente a partir do token |

### Respostas de erro

| Código | Situação |
|--------|----------|
| 400 | Dados inválidos (validação do Schema) ou ID malformado |
| 401 | Token ausente, inválido ou expirado |
| 404 | Tarefa não encontrada para o usuário |
| 409 | Email já cadastrado |
| 500 | Erro interno do servidor |

## Autores

- Juan Carlos Ribeiro Vieira
- João Pedro de Melo Bezerra
