import { useEffect, useState } from 'react'
import NoteForm from './components/NoteForm.jsx'
import NoteList from './components/NoteList.jsx'
import { listNotes, createNote, updateNote, deleteNote, shareNote } from './api.js'

export default function App() {
  const [notes, setNotes] = useState([])
  const [editing, setEditing] = useState(null)

  async function load() {
    const data = await listNotes()
    setNotes(data)
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(payload) {
    if (editing) {
      const updated = await updateNote(editing.id, payload)
      setEditing(null)
    } else {
      await createNote(payload)
    }
    await load()
  }

  async function handleDelete(id) {
    await deleteNote(id)
    await load()
  }

  async function handleToggleShare(note) {
    const toggled = await shareNote(note.id, !note.is_public)
    await load()
  }

  return (
    <div className="container">
      <div className="header">
        <div className="title">Notes App</div>
        <a className="btn" href="https://vercel.com/new" target="_blank" rel="noreferrer">Deploy to Vercel</a>
      </div>
      <NoteForm onSubmit={handleSubmit} initial={editing} />
      <div style={{marginTop: 16}} className="card">
        <div className="title" style={{fontSize: 16, marginBottom: 8}}>Your Notes</div>
        <NoteList
          notes={notes}
          onEdit={setEditing}
          onDelete={handleDelete}
          onToggleShare={handleToggleShare}
        />
      </div>
    </div>
  )
}
