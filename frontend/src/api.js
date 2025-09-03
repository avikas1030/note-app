const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function listNotes() {
  const res = await fetch(`${API_URL}/notes`);
  return res.json();
}

export async function createNote(data) {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateNote(id, data) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteNote(id) {
  await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });
}

export async function shareNote(id, is_public) {
  const res = await fetch(`${API_URL}/notes/${id}/share`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_public }),
  });
  return res.json();
}

export async function getPublicNote(slug) {
  const res = await fetch(`${API_URL}/notes/slug/${slug}`);
  return res.json();
}
