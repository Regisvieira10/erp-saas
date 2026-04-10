@echo off
echo ============================================
echo   ERP SaaS - Preparar para Deploy
echo ============================================
echo.

echo [1/3] Compilando backend...
cd /d "%~dp0backend"
npm run build
if errorlevel 1 (
    echo ERRO na compilacao do backend!
    pause
    exit /b 1
)
echo OK

echo [2/3] Compilando frontend...
cd /d "%~dp0frontend"
npm run build
if errorlevel 1 (
    echo ERRO na compilacao do frontend!
    pause
    exit /b 1
)
echo OK

echo [3/3] Verificando arquivos...
cd /d "%~dp0"
if exist "backend\dist\main.js" (
    echo   - Backend: OK
) else (
    echo   - Backend: FALTOU
)
if exist "frontend\.next" (
    echo   - Frontend: OK
) else (
    echo   - Frontend: FALTOU
)

echo.
echo ============================================
echo   Pronto para deploy!
echo ============================================
echo.
echo NEXT STEPS:
echo 1. Suba o codigo para o GitHub
echo 2. Configure Supabase (banco PostgreSQL)
echo 3. Deploy backend no Railway
echo 4. Deploy frontend no Vercel
echo.
echo Verifique DEPLOY.md para instrucoes detalhadas.
echo ============================================
pause