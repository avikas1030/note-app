import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPublicNote } from '../api'

export default function Share() {
  const { slug } = useParams()
  const [note, setNote] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await getPublicNote(slug)
        if (data.detail) {
          setError(data.detail)
        } else {
          setNote(data)
        }
      } catch (e) {
        setError('Unable to load note')
      }
    })()
  }, [slug])

  if (error) return <div className="container"><div className="card">{error}</div></div>
  if (!note) return <div className="container"><div className="card">Loading…</div></div>

  return (
    <div className="container">
      <div className="card">
        <div className="title">{note.title}</div>
        <div className="muted" style={{marginTop: 6}}>
          Public note • {new Date(note.created_at).toLocaleString()}
        </div>
        <div style={{whiteSpace: 'pre-wrap', marginTop: 12}}>{note.content}</div>
      </div>
    </div>
  )
}
