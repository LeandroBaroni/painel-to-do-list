# 📝 Painel To Do List

Projeto de gerenciamento de tarefas desenvolvido com **Angular**, com testes unitários utilizando **Jest**. Ele permite a criação de usuários, autenticação e gerenciamento de tarefas pessoais.

---

## 🚀 Funcionalidades

- ✅ Cadastro de usuário
- 🔐 Login com autenticação
- 📋 Listagem de tarefas pendentes
- ➕ Criação de tarefas com prioridade
- 🧪 Testes unitários com Jest

---

## 🛠️ Tecnologias Utilizadas

- [Angular](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Node.js](https://nodejs.org/)
- [API REST](https://to-do-list-rn9g.onrender.com) (ou `localhost` para ambiente de desenvolvimento)

---

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/painel-to-do-list.git
cd painel-to-do-list
npm install
▶️ Executar o Projeto
Modo Desenvolvimento
bash
Copiar código
ng serve
Acesse em: http://localhost:4300

Rodar Testes
bash
Copiar código
npm run test
🌐 API
✅ API Produção
perl
Copiar código
https://to-do-list-rn9g.onrender.com
🛠️ API Local
bash
Copiar código
http://127.0.0.1:5001/to-do-list-d8a09/southamerica-east1/app
🔐 Autenticação
📌 Cadastro de Usuário
Endpoint: POST /users/create

Body:

json
Copiar código
{
  "name": "Fulano Silva",
  "email": "fulanosilva@exemplo.com",
  "password": "senha123" // mínimo 6 caracteres
}

✅ Tarefas
📋 Listar Tarefas Pendentes
Endpoint: GET /tasks?completed=false
Requer Token de autenticação

➕ Criar Tarefa
Endpoint: POST /tasks
Body:

json
Copiar código
{
  "description": "Comprar leite",
  "priority": "Alta"
}
🧪 Testes com Jest
Este projeto utiliza o Jest para testes unitários. Os testes estão localizados nos arquivos *.spec.ts.

Executar os testes:
bash
Copiar código
npm run test
📁 Estrutura do Projeto (Resumo)
arduino
Copiar código
src/
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   └── pages/
├── assets/
├── environments/
├── setup-jest.ts
└── jest.config.js
