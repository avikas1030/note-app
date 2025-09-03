export default function NoteList({ notes, onEdit, onDelete, onToggleShare }) {
  return (
    <div className="list">
      {notes.map(n => (
        <div key={n.id} className="card">
          <div className="note-title">{n.title}</div>
          <div className="muted" style={{marginTop: 6}}>
            {new Date(n.created_at).toLocaleString()}
          </div>
          <p style={{whiteSpace: 'pre-wrap', marginTop: 8}}>{n.content.slice(0, 180)}{n.content.length > 180 ? '…' : ''}</p>
          <div className="row" style={{marginTop: 8}}>
            <button className="btn" onClick={() => onEdit(n)}>Edit</button>
            <button className="btn" onClick={() => onDelete(n.id)}>Delete</button>
            <button className="btn" onClick={() => onToggleShare(n)}>
              {n.is_public ? 'Unshare' : 'Share'}
            </button>
          </div>
          {n.is_public && n.slug && (
            <div style={{marginTop: 8}}>
              <div className="copy">Public URL:</div>
              <div className="muted">
                {`${window.location.origin}/share/${n.slug}`}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
