# FastAPI Backend for Notes App

## Local Dev
```bash
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API will run at http://localhost:8000

## Endpoints (summary)
- `GET /health` - health check
- `POST /notes` - create note
- `GET /notes` - list notes
- `GET /notes/{id}` - get note by id
- `PUT /notes/{id}` - update note
- `DELETE /notes/{id}` - delete note
- `GET /notes/slug/{slug}` - public, read-only note by slug
- `POST /notes/{id}/share` - toggle or set `is_public` and generate slug if needed
