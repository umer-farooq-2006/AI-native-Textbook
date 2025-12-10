<!--
Sync Impact Report:
Version change: 0.0.0 (initial) -> 1.0.0
List of modified principles:
- Added: Interactivity
- Added: Modularity
- Added: Reusability
- Added: Accessibility
Added sections:
- Project Overview
Removed sections:
- PRINCIPLE_5_NAME, PRINCIPLE_5_DESCRIPTION
- PRINCIPLE_6_NAME, PRINCIPLE__DESCRIPTION
Templates requiring updates:
- .specify/templates/plan-template.md: ✅ updated
- .specify/templates/spec-template.md: ✅ updated
- .specify/templates/tasks-template.md: ✅ updated
Follow-up TODOs: None
-->
# AI-native textbook project on Physical AI & Humanoid Robotics Constitution

## Core Principles

### Interactivity
AI-native textbook with chatbot support

### Modularity
Chapters structured for Claude Code tasks

### Reusability
Subagents and Agent Skills can be reused

### Accessibility
Option for Urdu translation

## Project Overview

### High-level Purpose
Teach students Physical AI, Humanoid Robotics, ROS 2, Gazebo, NVIDIA Isaac, and Vision-Language-Action (VLA) principles in an interactive AI-native textbook.

### Goals
- Enable students to bridge digital AI with physical robotics.
- Provide a complete AI-driven learning experience including simulation, perception, and conversational robotics.
- Embed a RAG chatbot for answering questions based on the textbook content.
- Support personalization and translation of content.

### Scope
- Chapters/modules covering: ROS 2 fundamentals, Digital Twin simulation (Gazebo & Unity), NVIDIA Isaac-based AI-Robot Brain, and Vision-Language-Action (VLA).
- Optional Capstone project integration: Autonomous Humanoid Robot simulation with voice and vision-based tasks.
- Bonus features: Signup/Signin, personalized content, Urdu translation.

### Constraints
- Must use Docusaurus for textbook website creation.
- Must integrate RAG chatbot using OpenAI Agents/ChatKit, FastAPI, Qdrant, and Neon Postgres.
- Must be deployable on GitHub Pages or Vercel.

### Stakeholders
- Students and learners
- Hackathon judges
- Panaversity founders and team

### Deliverables
- Spec-Kit Plus Constitution file
- Structured plan for modules and tasks
- Integration instructions for Claude Code CLI execution

## Governance
- Constitution supersedes all other practices.
- Amendments require documentation, approval, and a migration plan.
- All PRs/reviews must verify compliance.
- Complexity must be justified.

**Version**: 1.0.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-05
