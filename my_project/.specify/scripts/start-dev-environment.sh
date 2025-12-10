#!/bin/bash

echo "Starting AI Textbook Development Environment..."

# Start backend server in background
echo "Starting backend server..."
cd backend
python -m uvicorn src.main:app --reload --port 8000 &

# Start frontend server in background
echo "Starting frontend server..."
cd ../frontend
npm run start:dev &

echo "Development environment started!"
echo "- Backend: http://localhost:8000"
echo "- Frontend: http://localhost:3000"
echo "- Backend API docs: http://localhost:8000/docs"

# Wait for processes to finish
wait