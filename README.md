# Notes App — React + FastAPI (Shareable Notes)

Minimal CRUD notes app with public share links.

## Quickstart (Local)
### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit http://localhost:5173 (frontend) talking to http://localhost:8000 (backend).

## Deploy
- **Frontend on Vercel:** point Vercel to the `frontend` folder. Add env `VITE_API_URL` to your FastAPI public URL.
- **Backend on Render (free):**
  - Create a new **Web Service** from the `backend` folder repo.
  - Start command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
  - (Or any platform you like: Railway, Fly.io, Deta, etc.)

## Features
- Create, read, update, delete notes
- Toggle public sharing per note
- Public read-only page at `/share/:slug`
- SQLite database (file) by default
