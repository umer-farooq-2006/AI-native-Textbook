from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.rag import router as rag_router
from api.auth import router as auth_router
from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    app_name: str = "AI Textbook Backend"
    version: str = "0.1.0"
    debug: bool = os.getenv("DEBUG", "False").lower() == "true"

    class Config:
        env_file = ".env"


settings = Settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    debug=settings.debug
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(rag_router, prefix="/api/v1", tags=["rag"])
app.include_router(auth_router, prefix="/api/v1", tags=["auth"])

@app.get("/")
def read_root():
    return {
        "message": "Welcome to the AI Textbook Backend API",
        "version": settings.version,
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": settings.version}