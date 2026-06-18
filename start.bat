@echo off
echo =========================================
echo    JobMatcher AI Portal - Quick Start
echo =========================================
echo.

:: Docker check bypassed

echo [1/3] Starting MongoDB...
start "MongoDB" cmd /c "mongo_extracted\MongoDB\Server\7.0\bin\mongod.exe --dbpath mongo_data"

echo [2/3] Installing backend dependencies...
cd backend
call npm install
cd ..

echo [3/3] Starting services...
echo.
echo Starting Backend (port 5000)...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend (port 5173)...
start "Frontend" cmd /c "npm run dev"

echo Starting AI Service (port 8000)...
start "AI Service" cmd /k "cd ai-service && if exist .venv\Scripts\activate.bat (call .venv\Scripts\activate.bat) && pip install -r requirements.txt && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

echo.
echo =========================================
echo    All services starting!
echo =========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo MongoDB:  localhost:27017
echo.
echo Demo Login:
echo   Email:    john@email.com
echo   Password: password123
echo.
echo To seed data, run: cd backend ^&^& npm run seed
echo =========================================
pause
