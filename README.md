# Sistema de Gestão de Alunos - Frontend

Este é um sistema de gestão de alunos desenvolvido em React que permite realizar operações CRUD (Create, Read, Update, Delete) para gerenciar informações de estudantes.

## 🚀 Funcionalidades

- **Listar Alunos**: Visualizar todos os alunos cadastrados com filtros por nome, RA ou curso
- **Cadastrar Aluno**: Adicionar novos alunos ao sistema
- **Visualizar Detalhes**: Ver informações detalhadas de um aluno específico
- **Editar Aluno**: Atualizar informações de alunos existentes
- **Excluir Aluno**: Remover alunos do sistema
- **Interface Responsiva**: Layout adaptável para diferentes tamanhos de tela

## 📋 Campos de Aluno

- **Nome**: Campo de texto para o nome completo
- **RA**: Campo de texto para o Registro Acadêmico
- **Curso**: Dropdown com opções:
  - GE (Gestão Empresarial)
  - GPI (Gestão da Produção Industrial)
  - CD (Ciência de Dados)
  - DSM (Desenvolvimento de Software Multiplataforma)
  - CE (Construção de Edifícios)
  - DP (Design de Produto)
- **Turma**: Dropdown com semestres de 1 a 6
- **Status da Matrícula**: Radio button (Ativo/Inativo)

## 🛠️ Tecnologias Utilizadas

- **React 18.2.0**: Biblioteca JavaScript para interfaces
- **React Router DOM 6.11.0**: Roteamento para SPA
- **Axios 1.4.0**: Cliente HTTP para comunicação com API
- **Bootstrap 5.1.3**: Framework CSS para estilização
- **Font Awesome**: Ícones para interface

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── FormularioAluno.js    # Componente de formulário reutilizável
│   └── Layout.js             # Layout principal da aplicação
├── constants/
│   └── formOptions.js        # Constantes para dropdowns
├── pages/
│   ├── Home.js              # Página inicial
│   ├── ListaAlunos.js       # Lista de alunos
│   ├── NovoAluno.js         # Cadastro de novo aluno
│   ├── EditarAluno.js       # Edição de aluno
│   └── DetalhesAluno.js     # Detalhes do aluno
├── services/
│   └── alunosService.js     # Serviços de API
├── App.js                   # Componente principal
├── App.css                  # Estilos da aplicação
├── index.js                 # Ponto de entrada
└── index.css                # Estilos globais
```

## 🌐 API Backend

O frontend se comunica com uma API REST nas seguintes rotas:

- `POST http://localhost:8080/v1/api/alunos` - Criar aluno
- `GET http://localhost:8080/v1/api/alunos` - Listar todos os alunos
- `GET http://localhost:8080/v1/api/alunos/:id` - Buscar aluno por ID
- `GET http://localhost:8080/v1/api/alunos/ra/:ra` - Buscar aluno por RA
- `PUT http://localhost:8080/v1/api/alunos/:id` - Atualizar aluno
- `DELETE http://localhost:8080/v1/api/alunos/:id` - Excluir aluno

## 🚦 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend da API rodando na porta 8080

### Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd alunos-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse a aplicação em `http://localhost:3000`

## 📝 Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm test`: Executa os testes
- `npm run build`: Cria build de produção
- `npm run eject`: Ejeta a configuração do Create React App

## 🎨 Interface

A aplicação utiliza Bootstrap 5 para uma interface limpa e responsiva, com:

- Navbar de navegação
- Cards e tabelas estilizadas
- Formulários com validação
- Alertas e mensagens de feedback
- Estados de loading
- Ícones do Font Awesome

## 🔧 Configuração da API

Para alterar a URL base da API, edite o arquivo `src/services/alunosService.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/v1/api';
```

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona bem em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🐛 Tratamento de Erros

O sistema inclui tratamento abrangente de erros:
- Validação de formulários
- Mensagens de erro da API
- Estados de loading
- Confirmações para ações destrutivas
- Feedback visual para o usuário

## 🚀 Próximas Melhorias

- [ ] Paginação na lista de alunos
- [ ] Busca avançada com múltiplos filtros
- [ ] Exportação de dados (CSV, PDF)
- [ ] Gráficos e relatórios
- [ ] Autenticação e autorização
- [ ] Testes unitários e de integração

## 📄 Licença

Este projeto é parte de um sistema acadêmico de gestão de alunos.