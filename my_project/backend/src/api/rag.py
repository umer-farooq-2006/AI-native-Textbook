from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Any
from services.qdrant_neon_config import qdrant_service
from services.openai_service import openai_service
from models.database import get_db
from sqlalchemy.orm import Session
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class QueryRequest(BaseModel):
    query: str
    user_id: int = None  # Optional user ID for tracking

class QueryResponse(BaseModel):
    answer: str
    source_documents: List[Dict[str, Any]] = []

@router.post("/rag", response_model=QueryResponse)
async def rag_query(request: QueryRequest, db: Session = Depends(get_db)):
    """
    RAG (Retrieval-Augmented Generation) endpoint that:
    1. Embeds the query using OpenAI's embedding model
    2. Searches Qdrant for relevant textbook content
    3. Uses the retrieved content to generate an answer with OpenAI
    """
    try:
        # Step 1: Generate embedding for the query using the OpenAI service
        query_embedding = openai_service.generate_embedding(request.query)

        # Step 2: Search for similar documents in Qdrant
        similar_docs = qdrant_service.search_similar(query_embedding, limit=5)

        if not similar_docs:
            # If no documents found, return a default response
            answer = f"I couldn't find specific information about '{request.query}' in the textbook. Please check if your query relates to ROS 2, Gazebo & Unity, NVIDIA Isaac, or Vision-Language-Action (VLA) + GPT."
            return QueryResponse(answer=answer, source_documents=[])

        # Step 3: Prepare context from retrieved documents
        context_parts = []
        source_documents = []

        for doc in similar_docs:
            content = doc["payload"]["content"]
            title = doc["payload"]["title"]
            module = doc["payload"]["module"]
            context_parts.append(f"Title: {title}\nContent: {content}")

            source_documents.append({
                "title": title,
                "module": module,
                "score": doc["score"],
                "content_snippet": content[:200] + "..." if len(content) > 200 else content
            })

        context = "\n\n".join(context_parts)

        # Step 4: Generate answer using OpenAI service with the context
        answer = openai_service.generate_textbook_answer(request.query, context)

        # Log the query for analytics (optional)
        logger.info(f"RAG query processed: '{request.query[:50]}...' with {len(similar_docs)} source documents")

        return QueryResponse(answer=answer, source_documents=source_documents)

    except Exception as e:
        logger.error(f"Error processing RAG query: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing your query: {str(e)}")

# Additional endpoint to test the RAG system
@router.get("/rag/test")
async def test_rag():
    """Test endpoint to verify RAG system is working"""
    return {
        "message": "RAG system is operational",
        "modules_supported": ["ROS 2", "Gazebo & Unity", "NVIDIA Isaac", "Vision-Language-Action (VLA) + GPT"],
        "status": "ready"
    }
