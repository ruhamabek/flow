# 🚀 Flow

**Flow** is a **visual workflow automation platform** built with **Next.js** that lets you create, visualize, and execute browser-based tasks like scraping, form-filling, and navigation — all through an interactive flow editor powered by **React Flow**.
It features authentication via **Better Auth**, database management with **Prisma** + **PostgreSQL (Neon)**, and a rich developer experience powered by **TypeScript** and **Bun**.

---

## ✨ Features

- 🧩 **Drag & Drop Flow Builder** — Build node-based workflows visually using **React Flow**.  
- 🧠 **Execution Engine** — Run browser tasks using Puppeteer with logging and tracking.  
- 💾 **Persistent Storage** — Store user workflows, executions, and logs with **Prisma + Neon (Postgres)**.  
- 🔐 **Authentication** — Seamless and secure login/logout using **Better Auth**.  
- 📊 **Observability & Analytics** — Integrated optional support for **Polar**.  
- 🧑‍💻 **Developer Friendly** — Fully typed with **TypeScript**, styled with **Tailwind**, and built for extensibility.  

---

## 🧱 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [Next.js](https://nextjs.org) |
| UI Library | [React](https://react.dev) + [React Flow](https://reactflow.dev) |
| Authentication | [Better Auth](https://better-auth.com) |
| ORM | [Prisma](https://www.prisma.io) |
| Database | [PostgreSQL](https://www.postgresql.org) via [Neon](https://neon.tech) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Icons | [lucide-react](https://lucide.dev) |
| Notifications | [sonner](https://ui.shadcn.com/docs/components/sonner) |
| Analytics | [Polar](https://polar.sh) (optional) |
| Package Manager | [Bun](https://bun.sh) / npm / yarn / pnpm |
| Language | [TypeScript](https://www.typescriptlang.org) |

---

## ⚙️ Installation & Setup

Follow these steps to set up **Flow** locally.

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url> flow
cd flow

```
### 2️⃣ Install dependencies

You can use any package manager:

```bash
# Using Bun
bun install

# or npm
npm install

# or yarn
yarn

# or pnpm
pnpm install

```

### 3️⃣ Configure environment variables

Create a .env file in your project root and add your credentials:

```bash
# App
NEXT_PUBLIC_APP_NAME=Flow
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (example using Neon)
DATABASE_URL=postgresql://<user>:<password>@<neon-host>/<dbname>?sslmode=require

# Better Auth
BETTER_AUTH_API_KEY=your_better_auth_api_key
BETTER_AUTH_PROJECT_ID=your_project_id

# Polar (optional)
POLAR_PROJECT_ID=your_polar_project_id
POLAR_API_KEY=your_polar_api_key

```
📝 Tip: Copy these from .env.example if provided in the repository.

### 4️⃣ Setup the database

If you’re using Neon:

Create a database from Neon.tech

```bash

sudo -u postgres psql
CREATE DATABASE flow;
CREATE USER flow_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE flow TO flow_user;

```

Update your ```.env``:

```bash
DATABASE_URL=postgresql://flow_user:password@localhost:5432/flow?schema=public
```

### 5️⃣ Run Prisma migrations

```bash

npx prisma generate
npx prisma migrate dev --name init

```
### 6️⃣ Start the development server

```bash
# Using Bun
bun dev

# or npm
npm run dev

# or yarn
yarn dev

# or pnpm
pnpm dev
```

### Open your browser and navigate to:
👉 http://localhost:3000

### 🤝 Contributing

Contributions are welcome!

1. Fork this repository.

2. Create your branch:
```bash
git checkout -b feat/new-feature
```
3. Commit your changes:
```bash
git commit -m "Add new feature"
```
4. Push and open a Pull Request.

### 🛡️ Security

Do not commit .env files or secrets.

Use host-managed environment variables on deployment platforms.

Rotate your API keys periodically.

### 🧾 License

This project is licensed under the MIT License.

### 👩‍💻 Author

**Flow** is built and maintained by **Ruhama Bekele**

**X: 🔗 https://x.com/RBekele192122**

**LinkedIn: 🔗 https://www.linkedin.com/in/ruhama-bekele**