import { useState, useEffect } from 'react'

export default function NoteForm({ onSubmit, initial }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [content, setContent] = useState(initial?.content || '')

  useEffect(() => {
    setTitle(initial?.title || '')
    setContent(initial?.content || '')
  }, [initial])

  return (
    <div className="card">
      <div className="row">
        <input className="input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="row" style={{marginTop: 8}}>
        <textarea className="textarea" placeholder="Write your note..." value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <div className="row" style={{marginTop: 8, justifyContent: 'flex-end'}}>
        <button className="btn" onClick={() => onSubmit({ title, content })}>Save</button>
      </div>
    </div>
  )
}
