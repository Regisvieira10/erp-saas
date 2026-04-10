@echo off
echo ========================================
echo   ERP SaaS - Script de Inicializacao
echo ========================================
echo.

REM Verifica se PostgreSQL esta rodando
echo [1/5] Verificando PostgreSQL...
sc query postgresql-x64-16 2>nul | findstr /i "RUNNING" >nul
if %errorlevel% neq 0 (
    echo PostgreSQL nao esta rodando. Iniciando...
    net start postgresql-x64-16
) else (
    echo PostgreSQL ja esta rodando.
)
echo.

REM Compila o backend
echo [2/5] Compilando backend...
cd /d "%~dp0backend"
call npm run build
if %errorlevel% neq 0 (
    echo Erro ao compilar backend!
    pause
    exit /b 1
)
echo Backend compilado com sucesso.
echo.

REM Inicia o backend em segundo plano
echo [3/5] Iniciando backend...
start /b "ERP Backend" cmd /k "cd /d "%~dp0backend" && node dist/main.js"
timeout /t 5 /nobreak >nul
echo Backend iniciado em http://localhost:3001
echo.

REM Inicia o frontend em segundo plano
echo [4/5] Iniciando frontend...
cd /d "%~dp0frontend"
start /b "ERP Frontend" cmd /k "npm run dev"
timeout /t 5 /nobreak >nul
echo Frontend iniciado em http://localhost:3000
echo.

REM Cria tenant de teste
echo [5/5] Criando conta de teste...
powershell -Command "Invoke-RestMethod -Uri 'http://localhost:3001/auth/register' -Method Post -ContentType 'application/json' -Body '{\"tenantName\":\"Minha Empresa\",\"domain\":\"minhaempresa\",\"userName\":\"Administrador\",\"email\":\"admin@minhaempresa.com\",\"password\":\"senha123\"}' -TimeoutSec 10" 2>nul

echo.
echo ========================================
echo   SISTEMA INICIADO COM SUCESSO!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:3001
echo Swagger:  http://localhost:3001/api
echo.
echo Credenciais de acesso:
echo   Email:    admin@minhaempresa.com
echo   Senha:    senha123
echo.
echo ========================================
echo.
pause
