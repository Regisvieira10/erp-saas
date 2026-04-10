@echo off
cd /d "%~dp0backend"
echo Iniciando Backend...
start "Backend" cmd /k "npm run start:prod"

cd /d "%~dp0frontend"
echo Iniciando Frontend...
start "Frontend" cmd /k "npm run dev"

echo.
echo Servidores iniciados!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
pause