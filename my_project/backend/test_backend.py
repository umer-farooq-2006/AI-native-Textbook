"""
Test script to verify backend components can be imported and initialized
"""
import os
from unittest.mock import patch

# Mock the OpenAI API key to avoid the error during import
os.environ['OPENAI_API_KEY'] = 'test-key'

# Mock Qdrant connection to avoid connection errors during import
with patch('qdrant_client.QdrantClient'):
    try:
        from src.main import app
        print("[OK] Main app imported successfully")

        from src.api.rag import router
        print("[OK] RAG router imported successfully")

        from src.services.qdrant_neon_config import qdrant_service
        print("[OK] Qdrant service imported successfully")

        from src.services.openai_service import openai_service
        print("[OK] OpenAI service imported successfully")

        from src.models.database import SessionLocal, engine
        print("[OK] Database components imported successfully")

        from src.models.textbook import Chapter, InteractiveExample, Question, Answer
        print("[OK] Textbook models imported successfully")

        from src.models.user import User
        print("[OK] User model imported successfully")

        print("\n[OK] All backend components imported successfully!")
        print("[OK] Backend is ready for development")

    except Exception as e:
        print(f"[ERROR] Error importing backend components: {e}")
        raise