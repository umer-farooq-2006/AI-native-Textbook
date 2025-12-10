import os
from typing import List, Optional
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.http.models import Distance, VectorParams
from pydantic import BaseModel
import logging

# Configuration
QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = os.getenv("QDRANT_PORT", "6333")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
NEON_DB_URL = os.getenv("NEON_DB_URL")

# Initialize Qdrant client
qdrant_client = QdrantClient(
    host=QDRANT_HOST,
    port=QDRANT_PORT,
    api_key=QDRANT_API_KEY,
    # If using HTTPS/Qdrant Cloud, uncomment the following:
    # https=True,
)

# Collection name for textbook content
TEXTBOOK_COLLECTION = "textbook_content"

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TextbookDocument(BaseModel):
    """Model for textbook content that will be stored in Qdrant"""
    id: str
    title: str
    content: str
    module: str  # ROS 2, Gazebo & Unity, NVIDIA Isaac, VLA+GPT
    chapter_id: int
    metadata: dict = {}


class QdrantService:
    """Service class to handle Qdrant operations for the RAG system"""

    def __init__(self, client: QdrantClient, collection_name: str = TEXTBOOK_COLLECTION):
        self.client = client
        self.collection_name = collection_name

    def create_collection(self, vector_size: int = 1536) -> bool:
        """Create a collection in Qdrant for textbook content if it doesn't exist"""
        try:
            # Check if collection exists
            collections = self.client.get_collections()
            collection_names = [col.name for col in collections.collections]

            if self.collection_name not in collection_names:
                # Create collection with vector configuration
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE)
                )
                logger.info(f"Created Qdrant collection: {self.collection_name}")
                return True
            else:
                logger.info(f"Qdrant collection {self.collection_name} already exists")
                return False
        except Exception as e:
            logger.error(f"Error creating Qdrant collection: {e}")
            return False

    def upsert_documents(self, documents: List[TextbookDocument], embeddings: List[List[float]]) -> bool:
        """Upsert textbook documents into Qdrant collection"""
        try:
            points = []
            for doc, embedding in zip(documents, embeddings):
                points.append(
                    models.PointStruct(
                        id=doc.id,
                        vector=embedding,
                        payload={
                            "title": doc.title,
                            "content": doc.content,
                            "module": doc.module,
                            "chapter_id": doc.chapter_id,
                            "metadata": doc.metadata
                        }
                    )
                )

            self.client.upsert(
                collection_name=self.collection_name,
                points=points
            )
            logger.info(f"Upserted {len(documents)} documents to Qdrant collection: {self.collection_name}")
            return True
        except Exception as e:
            logger.error(f"Error upserting documents to Qdrant: {e}")
            return False

    def search_similar(self, query_embedding: List[float], limit: int = 5) -> List[dict]:
        """Search for similar documents based on query embedding"""
        try:
            search_results = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=limit
            )

            results = []
            for result in search_results:
                results.append({
                    "id": result.id,
                    "score": result.score,
                    "payload": result.payload
                })

            logger.info(f"Found {len(results)} similar documents in Qdrant")
            return results
        except Exception as e:
            logger.error(f"Error searching in Qdrant: {e}")
            return []


# Initialize the service
qdrant_service = QdrantService(qdrant_client)

# Create collection if it doesn't exist
qdrant_service.create_collection()

logger.info("Qdrant service initialized and collection created/verified.")
