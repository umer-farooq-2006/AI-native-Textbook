# AI-native Textbook Project

An interactive textbook for Physical AI & Humanoid Robotics with an embedded RAG chatbot, covering ROS 2, Gazebo & Unity, NVIDIA Isaac, and Vision-Language-Action (VLA) + GPT.

## Features

- Interactive textbook content built with Docusaurus
- RAG (Retrieval-Augmented Generation) chatbot for Q&A
- Modules covering:
  - ROS 2 (Robot Operating System 2)
  - Gazebo & Unity simulation environments
  - NVIDIA Isaac platform
  - Vision-Language-Action (VLA) + GPT models
- Optional personalization and Urdu translation

## Tech Stack

- **Frontend**: Docusaurus (React-based static site generator)
- **Backend**: FastAPI (Python web framework)
- **Vector Database**: Qdrant for document embeddings
- **Relational Database**: Neon Postgres
- **LLM Integration**: OpenAI API
- **Frontend Linting**: ESLint + Prettier
- **Backend Linting**: Black, Flake8, isort

## Project Structure

```
├── backend/                 # FastAPI backend
│   ├── src/
│   │   ├── api/            # API routes
│   │   ├── models/         # Database models
│   │   └── services/       # Business logic
│   ├── requirements.txt    # Python dependencies
│   └── .env.example       # Environment variables template
├── frontend/                # Docusaurus frontend
│   ├── docs/               # Textbook content
│   ├── src/                # Custom components
│   ├── package.json        # Node dependencies
│   └── docusaurus.config.js # Docusaurus configuration
└── specs/1-ai-textbook-project/ # Project specifications
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.9 or higher)
- Poetry (for Python dependency management) or pip

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   # Using pip
   pip install -r requirements.txt

   # Or using poetry
   poetry install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your actual configuration:
   - `NEON_DB_URL`: Your Neon Postgres connection string
   - `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`: Qdrant configuration
   - `OPENAI_API_KEY`: Your OpenAI API key

5. Run the backend server:
   ```bash
   cd src
   uvicorn main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run start:dev
   ```

## Environment Variables

### Backend (.env)

- `NEON_DB_URL`: Postgres database connection string
- `QDRANT_HOST`: Qdrant server host (default: localhost)
- `QDRANT_PORT`: Qdrant server port (default: 6333)
- `QDRANT_API_KEY`: Qdrant API key (if using cloud)
- `OPENAI_API_KEY`: OpenAI API key for embeddings and chat
- `DEBUG`: Enable/disable debug mode (default: false)

## Development

### Backend Linting & Formatting

```bash
# Run linters
flake8 .
black --check .
isort --check-only .

# Format code
black .
isort .
```

### Frontend Linting & Formatting

```bash
# Lint
npm run lint

# Format
npm run format
```

## API Endpoints

- `GET /` - Root endpoint with API info
- `GET /health` - Health check
- `POST /api/v1/rag` - RAG chatbot endpoint
- `GET /api/v1/rag/test` - Test RAG functionality
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation (ReDoc)

## Running Tests

Backend tests (to be implemented):
```bash
cd backend
pytest
```

Frontend tests (to be implemented):
```bash
cd frontend
npm test
```

## Deployment

The frontend can be deployed to GitHub Pages or Vercel. The backend needs to be deployed to a server that supports Python applications (e.g., Heroku, AWS, GCP).

For Docusaurus deployment, run:
```bash
cd frontend
npm run build
```

## Architecture Decision Records (ADRs)

ADRs are stored in `history/adr/` and document significant architectural decisions made during development.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting and formatting
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request