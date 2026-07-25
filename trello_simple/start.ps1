#!/powershell
# Arranca PostgreSQL, backend y frontend
Set-Location $PSScriptRoot

Write-Host "Levantando PostgreSQL..." -ForegroundColor Cyan
docker compose up -d

Write-Host "Instalando e iniciando backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm install; npm run start:dev"

Write-Host "Instalando e iniciando frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm install; npm start"

Write-Host "Listo. Frontend: http://localhost:4200  API: http://localhost:3000" -ForegroundColor Green
