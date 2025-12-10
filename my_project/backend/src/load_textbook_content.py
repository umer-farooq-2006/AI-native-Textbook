"""
Content loader for the AI-native textbook project.
This script loads textbook content from the Docusaurus docs into Qdrant for RAG.
"""
import os
import sys
import json
from pathlib import Path
from typing import List

# Add backend/src to the path so we can import our modules
sys.path.insert(0, os.path.dirname(__file__))

from services.qdrant_neon_config import qdrant_service, TextbookDocument
from services.openai_service import openai_service

def load_textbook_content_from_docs(docs_path: str) -> List[TextbookDocument]:
    """
    Load textbook content from Docusaurus docs directory structure.
    """
    documents = []

    # Define the modules we're covering
    modules = {
        'ros2': 'ROS 2',
        'gazebo-unity': 'Gazebo & Unity',
        'nvidia-isaac': 'NVIDIA Isaac',
        'vla-gpt': 'Vision-Language-Action (VLA) + GPT'
    }

    docs_dir = Path(docs_path)

    for module_key, module_name in modules.items():
        module_dir = docs_dir / module_key

        if module_dir.exists():
            # Process all markdown files in the module directory
            for md_file in module_dir.glob("*.md"):
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                    # Create a title from the filename
                    title = md_file.stem.replace('-', ' ').title()

                    # Create document ID from module and filename
                    doc_id = f"{module_key}_{md_file.stem}"

                    # Create TextbookDocument
                    doc = TextbookDocument(
                        id=doc_id,
                        title=title,
                        content=content,
                        module=module_name,
                        chapter_id=hash(doc_id) % 1000  # Simple hash-based chapter ID
                    )

                    documents.append(doc)

                    print(f"Loaded document: {doc_id} from {md_file}")

    # Also load the intro page
    intro_file = docs_dir / "intro.md"
    if intro_file.exists():
        with open(intro_file, 'r', encoding='utf-8') as f:
            content = f.read()

            doc = TextbookDocument(
                id="intro",
                title="Introduction to AI-native Textbook",
                content=content,
                module="Introduction",
                chapter_id=0
            )

            documents.append(doc)
            print(f"Loaded document: intro from {intro_file}")

    return documents

def embed_and_store_documents(documents: List[TextbookDocument]):
    """
    Generate embeddings for documents and store them in Qdrant.
    """
    print(f"Processing {len(documents)} documents...")

    embeddings = []

    for i, doc in enumerate(documents):
        print(f"Processing document {i+1}/{len(documents)}: {doc.title}")

        # Generate embedding for the content
        try:
            # Combine title and content for better embeddings
            text_to_embed = f"{doc.title}\n\n{doc.content}"
            embedding = openai_service.generate_embedding(text_to_embed)
            embeddings.append(embedding)
        except Exception as e:
            print(f"Error generating embedding for {doc.id}: {e}")
            # Use a zero vector as fallback
            embeddings.append([0.0] * 1536)  # Assuming 1536-dim embedding

    # Upsert documents to Qdrant
    success = qdrant_service.upsert_documents(documents, embeddings)

    if success:
        print(f"Successfully stored {len(documents)} documents in Qdrant!")
    else:
        print("Failed to store documents in Qdrant.")

    return success

def main():
    # Path to the Docusaurus docs directory
    docs_path = os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "docs")

    if not os.path.exists(docs_path):
        print(f"Docs path does not exist: {docs_path}")
        return

    print("Loading textbook content...")
    documents = load_textbook_content_from_docs(docs_path)

    if not documents:
        print("No documents found to load.")
        return

    print(f"Loaded {len(documents)} documents. Generating embeddings and storing in Qdrant...")
    embed_and_store_documents(documents)

    print("Content loading complete!")

if __name__ == "__main__":
    main()