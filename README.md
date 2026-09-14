# gerenciador-de-tarefas-mern
Gerenciador de Tarefas — MERN Stack

Aplicação full-stack de gerenciamento de tarefas, com autenticação de usuários e CRUD de tarefas, construída com MongoDB, Express, React e Node.js.

🚀 Tecnologias

Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt Frontend: React (Vite), React Router, Axios/Fetch

📁 Estrutura do Projeto
gerenciador-de-tarefas-mern/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
⚙️ Pré-requisitos
Node.js (versão 18 ou superior)
Conta gratuita no MongoDB Atlas
Git
🔧 Instalação e Configuração
1. Clone o repositório
bash
git clone https://github.com/seu-usuario/gerenciador-de-tarefas-mern.git
cd gerenciador-de-tarefas-mern
2. Configurando o Backend
bash
cd backend
npm install

Crie um arquivo .env na raiz da pasta backend/ com base no .env.example:

env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster0.xxxxx.mongodb.net/gerenciador-tarefas?retryWrites=true&w=majority
JWT_SECRET=sua_chave_secreta_aqui

Como obter o MONGO_URI:

Crie um cluster gratuito no MongoDB Atlas.
Em Database Access, crie um usuário e senha.
Em Network Access, libere o IP (0.0.0.0/0 para desenvolvimento).
Em Database → Connect → Drivers, copie a connection string e substitua <usuario> e <senha> pelos valores reais.

Inicie o servidor:

bash
npm run dev

O backend estará disponível em http://localhost:3000.

3. Configurando o Frontend

Em outro terminal:

bash
cd frontend
npm install
npm run dev

O frontend estará disponível em http://localhost:5173 (padrão do Vite).

🔐 Autenticação
As senhas são armazenadas com hash usando bcrypt.
O login gera um token JWT, que deve ser enviado no header das requisições protegidas:
Authorization: Bearer <token>
📌 Endpoints Principais
Método	Rota	Descrição	Protegida
POST	/api/auth/register	Cria um novo usuário	Não
POST	/api/auth/login	Autentica e retorna um token	Não
GET	/api/tasks	Lista as tarefas do usuário	Sim
POST	/api/tasks	Cria uma nova tarefa	Sim
PUT	/api/tasks/:id	Atualiza uma tarefa	Sim
DELETE	/api/tasks/:id	Remove uma tarefa	Sim
👥 Autores
Juan Carlos Ribeiro Vieira
João Pedro de Melo Bezerra
