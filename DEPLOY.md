# ERP SaaS - Deploy Guide

## Status do Projeto

- **Backend**: NestJS (porta 3001) ✓
- **Frontend**: Next.js (porta 3000) ✓
- **Banco**: Supabase (PostgreSQL) ✓
- **Docker**: Não disponível no PC

---

## Opções de Deploy (Gratuitas)

### Opção 1: Fly.io (Recomendado)

#### Configuração já preparada:
- App: `erp-saas-prod` (criado automaticamente)
- Región: São Paulo (gru)
- Banco: Supabase conectado

#### Para fazer deploy:

1. **Criou uma conta no Fly.io?** (https://fly.io)

2. **Instale o Fly CLI** (em outro PC ou quando tiver internet):
```bash
winget install fly-cli
# ou
curl -L https://fly.io/install.sh | sh
```

3. **Faça login**:
```bash
fly auth login
```

4. **Deploy**:
```bash
cd C:\Users\Potato\erp-saas
fly deploy --app erp-saas-prod --now
```

---

### Opção 2: Render.com

1. Acesse https://render.com
2. New → Web Service
3. Conecte o repositório GitHub
4. Configure:
   - **Build Command**: `cd backend && npm install && npx prisma generate && npm run build`
   - **Start Command**: `node dist/main.js`
   - **Root Directory**: `backend`
5. Environment Variables:
   - `DATABASE_URL` = `postgres://postgres:KM%2Ctr9fmc%24huP%26S@db.kepnqtblmpcsgvuzvmdf.supabase.co:5432/postgres`
   - `JWT_SECRET` = `erp_secret_2024_production`
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
6. Deploy!

---

### Opção 3: GitHub Actions (Automático)

1. **Faça push do código para GitHub**:
```bash
cd C:\Users\Potato\erp-saas
git init
git add .
git commit -m "ERP SaaS v1.0"
git remote add origin https://github.com/SEU_USUARIO/erp-saas.git
git push -u origin main
```

2. **Configure os secrets no GitHub**:
   - Settings → Secrets → Actions
   - Adicione: `FLY_API_TOKEN`, `DATABASE_URL`, `JWT_SECRET`

3. **O deploy será automático!**
   - O workflow já está configurado em `.github/workflows/deploy.yml`

---

## Deploy do Frontend (Vercel)

1. Acesse https://vercel.com
2. New Project → Import do GitHub
3. Selecione o repositório `erp-saas`
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
5. Environment Variables:
   - `NEXT_PUBLIC_API_URL` = URL do backend + `/api`
     - Exemplo: `https://erp-saas-prod.fly.dev/api`
6. Deploy!

---

## Primeiro Acesso

Após o deploy, crie o primeiro usuário:

```bash
curl -X POST https://SUA_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "tenantName": "Sua Empresa",
    "domain": "suaempresa",
    "userName": "Admin",
    "email": "admin@empresa.com",
    "password": "SUASENHA123"
  }'
```

---

## Estrutura do Projeto

```
erp-saas/
├── backend/               # API NestJS
│   ├── src/               # Código fonte
│   ├── prisma/            # Schema do banco
│   ├── dist/              # Compilado (production)
│   ├── Dockerfile         # Para deploy manual
│   ├── .env               # Variáveis de ambiente
│   └── package.json
├── frontend/              # Next.js
├── fly.toml               # Configuração Fly.io
├── render.yaml            # Configuração Render
└── .github/workflows/     # CI/CD
    └── deploy.yml
```

---

## Variáveis de Ambiente (Banco)

```env
DATABASE_URL=postgres://postgres:KM%2Ctr9fmc%24huP%26S@db.kepnqtblmpcsgvuzvmdf.supabase.co:5432/postgres
JWT_SECRET=erp_secret_2024_production
PORT=3001
NODE_ENV=production
```

---

## Problemas Conhecidos

### Fly.io - "cannot apply host to transport"

Se o deploy Falhar com erro `cannot apply host to transport`:
- Tente novamente após alguns minutos
- Use `--recreate-builder` flag
- ou use a opção Render.com

### Docker não disponível

O PC não tem Docker/WinSS/hipervisor. Use:
- Deploy via GitHub Actions (recomendado)
- ou deploy manual em outro ambiente

---

## Contato

Em caso de dúvidas, verifique os logs de deploy ou entre em contato!