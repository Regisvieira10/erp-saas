# ERP SaaS - Script de Inicializacao (PowerShell)
# Execute como Administrator se necessario

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ERP SaaS - Script de Inicializacao" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verifica PostgreSQL
Write-Host "[1/5] Verificando PostgreSQL..." -ForegroundColor Yellow
$postgresService = Get-Service -Name "postgresql-x64-16" -ErrorAction SilentlyContinue
if ($postgresService -and $postgresService.Status -ne "Running") {
    Write-Host "Iniciando PostgreSQL..." -ForegroundColor Yellow
    Start-Service -Name "postgresql-x64-16"
} elseif ($postgresService -and $postgresService.Status -eq "Running") {
    Write-Host "PostgreSQL ja esta rodando." -ForegroundColor Green
} else {
    Write-Host "PostgreSQL nao encontrado. Verifique a instalacao." -ForegroundColor Red
}
Write-Host ""

# Compila backend
Write-Host "[2/5] Compilando backend..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\backend"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro ao compilar backend!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host "Backend compilado." -ForegroundColor Green
Write-Host ""

# Inicia backend
Write-Host "[3/5] Iniciando backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\backend'; node dist/main.js" -WindowStyle Normal -PassThru
Write-Host "Aguarde 5 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Write-Host "Backend iniciado em http://localhost:3001" -ForegroundColor Green
Write-Host ""

# Inicia frontend
Write-Host "[4/5] Iniciando frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\frontend'; npm run dev" -WindowStyle Normal -PassThru
Write-Host "Aguarde 5 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Write-Host "Frontend iniciado em http://localhost:3000" -ForegroundColor Green
Write-Host ""

# Cria tenant teste
Write-Host "[5/5] Criando conta de teste..." -ForegroundColor Yellow
$body = @{
    tenantName = "Minha Empresa"
    domain = "minhaempresa"
    userName = "Administrador"
    email = "admin@minhaempresa.com"
    password = "senha123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/auth/register" -Method Post -ContentType "application/json" -Body $body -TimeoutSec 10
    Write-Host "Conta criada com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Conta ja existe ou erro na criacao. Tentando login..." -ForegroundColor Yellow
}
Write-Host ""

# Resultado
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SISTEMA INICIADO COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "Backend:  http://localhost:3001" -ForegroundColor White
Write-Host "Swagger:  http://localhost:3001/api" -ForegroundColor White
Write-Host ""
Write-Host "Credenciais de acesso:" -ForegroundColor Yellow
Write-Host "  Email:    admin@minhaempresa.com" -ForegroundColor White
Write-Host "  Senha:    senha123" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

Read-Host "Pressione Enter para sair"
