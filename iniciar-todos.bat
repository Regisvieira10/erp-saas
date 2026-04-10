@echo off
echo ============================================
echo   ERP SaaS - Iniciando Servidores
echo ============================================
echo.

echo [1/2] Iniciando Backend (NestJS) na porta 3001...
cd /d "%~dp0backend"
start "ERP Backend" cmd /k "npm run start:prod"

echo [2/2] Iniciando Frontend (Next.js) na porta 3000...
cd /d "%~dp0frontend"
start "ERP Frontend" cmd /k "npm run dev"

echo.
echo ============================================
echo   Servidores iniciados!
echo   Backend: http://localhost:3001
echo   Frontend: http://localhost:3000
echo   Swagger:  http://localhost:3001/api
echo ============================================
pause