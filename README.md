# AuthSystem

Um sistema simples e moderno de autenticação com Next.js, Google OAuth e Email/Senha. Ideal para ser usado como base em projetos Next.js que necessitam de login seguro e proteção de rotas.

## 🚀 Tecnologias utilizadas

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod (validação de formulários)
- Auth.js (NextAuth)
- Drizzle ORM (migrations e banco de dados)
- PostgreSQL, MySQL ou SQLite
- Deploy na Vercel (recomendado)

## 🎯 Funcionalidades

- 🔐 Login com Google OAuth
- 🔑 Login com Email e Senha
- ✅ Cadastro com validação de dados
- 🔒 Proteção de rotas autenticadas
- 🔄 Sessão persistente com Auth.js (NextAuth)
- 🧠 Validação robusta com Zod + React Hook Form
- 💎 UI moderna com efeito Glassmorphism

## 📸 Demonstração

![Tela de Login](./public/demo-login.png)
![Tela de Dashboard](./public/demo-dashboard.png)

## 🔧 Instalação e execução local

### 1. Clone o repositório

```bash
git clone https://github.com/devFelipeMarcos/login-next
```

### 2. Acesse o diretório do projeto

```bash
cd authsystem
```

### 3. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 4. Configure o arquivo de ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto e adicione:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE
NEXTAUTH_SECRET=sua_chave_secreta
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
```

> 🔑 Para obter as credenciais do Google, acesse [console.cloud.google.com](https://console.cloud.google.com/) → APIs e Serviços → Credenciais → OAuth Client ID.

### 5. Execute as migrations (Drizzle ORM)

```bash
npx drizzle-kit push
```

### 6. Inicie o projeto

```bash
npm run dev
# ou
yarn dev
```

Acesse no navegador:  
👉 [http://localhost:3000](http://localhost:3000)

```

## 💻 Deploy

O projeto está pronto para deploy na [Vercel](https://vercel.com/).

- **Configure as variáveis de ambiente na Vercel**
- Clique em **"Deploy"**

## 🙋‍♂️ Autor

Desenvolvido por [Felipe Marcos](https://github.com/seu-usuario) 🚀

## 📝 Licença

Este projeto está sob licença MIT.
Sinta-se livre para usar, modificar e compartilhar.
```
