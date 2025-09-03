from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import select
from .database import SessionLocal, engine, Base
from .models import Note
from .schemas import NoteCreate, NoteUpdate, NoteOut, ShareRequest
from .utils import slugify, random_suffix

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Notes API", version="1.0.0")

# CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/notes", response_model=NoteOut, status_code=201)
def create_note(payload: NoteCreate, db: Session = Depends(get_db)):
    note = Note(title=payload.title, content=payload.content, is_public=False)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@app.get("/notes", response_model=list[NoteOut])
def list_notes(db: Session = Depends(get_db)):
    notes = db.execute(select(Note).order_by(Note.created_at.desc())).scalars().all()
    return notes

@app.get("/notes/{note_id}", response_model=NoteOut)
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.get(Note, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@app.put("/notes/{note_id}", response_model=NoteOut)
def update_note(note_id: int, payload: NoteUpdate, db: Session = Depends(get_db)):
    note = db.get(Note, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    if payload.title is not None:
        note.title = payload.title
    if payload.content is not None:
        note.content = payload.content
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@app.delete("/notes/{note_id}", status_code=204)
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.get(Note, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return

@app.post("/notes/{note_id}/share", response_model=NoteOut)
def share_note(note_id: int, req: ShareRequest, db: Session = Depends(get_db)):
    note = db.get(Note, note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    note.is_public = req.is_public
    if req.is_public and not note.slug:
        note.slug = f"{slugify(note.title)}-{random_suffix()}"
    if not req.is_public:
        note.slug = None
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@app.get("/notes/slug/{slug}", response_model=NoteOut)
def get_public_note(slug: str, db: Session = Depends(get_db)):
    stmt = select(Note).where(Note.slug == slug, Note.is_public == True)
    note = db.execute(stmt).scalars().first()
    if not note:
        raise HTTPException(status_code=404, detail="Public note not found")
    return note
