# ERP SaaS - Sistema de Gestão Multi-tenant

## Deploy Guide

### 1. Preparar o GitHub

```bash
cd C:\Users\Potato\erp-saas

# Inicializar git
git init
git add .
git commit -m "ERP SaaS v1.0"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/SEU_USUARIO/erp-saas.git
git push -u origin main
```

### 2. Criar Banco no Supabase

1. Acesse https://supabase.com
2. Crie projeto gratuito
3. Vá em Settings → Database → Connection String
4. Copie a URI (vai precisar no Railway)

### 3. Deploy Backend no Railway

1. Acesse https://railway.app
2. Login com GitHub
3. New Project → Deploy from GitHub repo
4. Selecione o repositório `erp-saas`
5. Em **Variables**, adicione:
   - `DATABASE_URL` = sua string do Supabase
   - `JWT_SECRET` = uma senha forte (ex: `g3r4nd3_s3nh4_sup3r_s3gur4_2024`)
   - `NODE_ENV` = production
6. Em **Settings** → Start Command: `node dist/main.js`
7. Em **Settings** → Root Directory: `backend`
8. Deploy! (anote a URL, ex: `https://erp-saas.railway.app`)

### 4. Deploy Frontend no Vercel

1. Acesse https://vercel.com
2. New Project → Import do GitHub
3. Selecione o repositório
4. Em **Environment Variables**:
   - `NEXT_PUBLIC_API_URL` = URL do Railway + `/api` (ex: `https://erp-saas.railway.app/api`)
5. Framework Preset: Next.js
6. Root Directory: `frontend`
7. Deploy!

### 5. Primeiro Acesso

Backend: `https://seu-backend.railway.app/api`

Criar primeiro usuário via curl:
```bash
curl -X POST https://seu-backend.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"tenantName":"Sua Empresa","domain":"suaempresa","userName":"Admin","email":"admin@empresa.com","password":"SUASENHA123"}'
```

## Estrutura do Projeto

```
erp-saas/
├── backend/          # API NestJS (porta 3001)
│   ├── src/
│   ├── prisma/       # Schema do banco
│   └── dist/         # Compilado
├── frontend/         # Next.js (porta 3000)
│   ├── src/
│   └── pages/        # Rotas
└── README.md
```

## Comandos Úteis

### Backend
```bash
cd backend
npm run build        # Compilar
npm run start:prod   # Produção
npx prisma db push   # Sincronizar banco
```

### Frontend
```bash
cd frontend
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run start        # Start produção
```
