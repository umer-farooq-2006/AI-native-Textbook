import os
import openai
import logging
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from openai import OpenAI

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize OpenAI client (will be created when needed)
openai_client = None

class ChatMessage(BaseModel):
    role: str  # "system", "user", or "assistant"
    content: str

class OpenAIService:
    """Service class to handle OpenAI operations for the RAG system"""

    def __init__(self, client: OpenAI = None):
        self.client = client or self._get_client()

    def _get_client(self) -> OpenAI:
        """Get or create the OpenAI client"""
        global openai_client
        if openai_client is None:
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                logger.warning("OPENAI_API_KEY environment variable is not set")
                # For development, we'll set a placeholder that will error when used
                # This allows the module to import but will fail when actually making calls
                class MockOpenAIClient:
                    def __getattr__(self, name):
                        def method(*args, **kwargs):
                            raise ValueError("OPENAI_API_KEY environment variable must be set to use OpenAI services")
                        return method
                openai_client = MockOpenAIClient()
            else:
                openai_client = OpenAI(api_key=api_key)
        return openai_client

    def generate_embedding(self, text: str, model: str = "text-embedding-ada-002") -> List[float]:
        """Generate embedding for a given text using OpenAI's embedding model"""
        try:
            response = self.client.embeddings.create(
                input=text,
                model=model
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            raise

    def generate_response(self,
                         messages: List[ChatMessage],
                         model: str = "gpt-3.5-turbo",
                         max_tokens: int = 500,
                         temperature: float = 0.3) -> str:
        """Generate a response using OpenAI's chat completion model"""
        try:
            # Convert Pydantic models to dictionaries for the API
            message_dicts = [{"role": msg.role, "content": msg.content} for msg in messages]

            response = self.client.chat.completions.create(
                model=model,
                messages=message_dicts,
                max_tokens=max_tokens,
                temperature=temperature
            )

            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            raise

    def generate_textbook_answer(self, query: str, context: str) -> str:
        """Generate an educational answer based on query and context from textbook"""
        system_message = ChatMessage(
            role="system",
            content="You are an AI assistant for an AI-native textbook on Physical AI & Humanoid Robotics. Answer questions based on the provided context from the textbook. Be helpful, accurate, educational, and cite the source when possible."
        )

        user_message = ChatMessage(
            role="user",
            content=f"""
            You are an AI assistant for an AI-native textbook on Physical AI & Humanoid Robotics.
            Use the following context to answer the question. If the context doesn't contain relevant information,
            acknowledge that you don't have specific information about this topic in the textbook.

            Context:
            {context}

            Question: {query}

            Provide a comprehensive, educational answer based on the context.
            """
        )

        messages = [system_message, user_message]
        return self.generate_response(messages)

    def extract_keywords(self, text: str) -> List[str]:
        """Extract relevant keywords from text to help with search"""
        system_message = ChatMessage(
            role="system",
            content="You are a keyword extraction assistant. Extract 3-5 relevant keywords from the provided text. Respond with only the keywords separated by commas."
        )

        user_message = ChatMessage(
            role="user",
            content=f"Extract keywords from this text: {text}"
        )

        messages = [system_message, user_message]
        keywords_str = self.generate_response(messages, max_tokens=100, temperature=0.1)

        # Parse the keywords
        keywords = [kw.strip() for kw in keywords_str.split(",")]
        return [kw for kw in keywords if kw]  # Remove empty strings


# Initialize the service
openai_service = OpenAIService()

logger.info("OpenAI service initialized.")