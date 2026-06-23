# Acid-task

A full-stack web application for managing workout plans and tracking completed training sessions.

## Tech Stack

**Frontend**
- React + TypeScript
- Redux Toolkit + RTK Query
- React Router
- React Hook Form + Zod
- SCSS

**Backend**
- Node.js + Express.js
- Sequelize ORM
- PostgreSQL
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- Docker (optional)

### Database setup

Start PostgreSQL via Docker:

```bash
docker-compose --env-file ./backend/.env up -d
```

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

## Environment Variables

### Backend `.env.example`
### Frontend `.env.example`

### Realization (Frontend)
