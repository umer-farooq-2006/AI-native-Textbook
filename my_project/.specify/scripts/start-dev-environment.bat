@echo off
echo Starting AI Textbook Development Environment...

echo Starting backend server...
start cmd /k "cd backend && cd src && uvicorn main:app --reload --port 8000"

echo Starting frontend server...
start cmd /k "cd frontend && npm run start:dev"

echo Development environment started!
echo - Backend: http://localhost:8000
echo - Frontend: http://localhost:3000
echo - Backend API docs: http://localhost:8000/docs
pause