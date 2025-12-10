from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


class Chapter(Base):
    __tablename__ = "chapters"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    module = Column(String, index=True)  # ROS 2, Gazebo, NVIDIA Isaac, VLA+GPT
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship
    interactive_examples = relationship("InteractiveExample", back_populates="chapter")


class InteractiveExample(Base):
    __tablename__ = "interactive_examples"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    code = Column(Text)
    chapter_id = Column(Integer, ForeignKey("chapters.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship
    chapter = relationship("Chapter", back_populates="interactive_examples")


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship
    user = relationship("User", back_populates="questions")
    answers = relationship("Answer", back_populates="question")


class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text)
    question_id = Column(Integer, ForeignKey("questions.id"))
    source_documents = Column(Text)  # JSON string of source documents used
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship
    question = relationship("Question", back_populates="answers")