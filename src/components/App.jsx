import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Toast from "./Toast";
import { neon } from "@neondatabase/serverless";

export const sql = neon(
  "postgresql://neondb_owner:wsDf8yzTN3eQ@ep-polished-mud-a51amk9n.us-east-2.aws.neon.tech/neondb?sslmode=require"
);

function App() {
  const [noteList, setNoteList] = useState([]);

  // Toast state
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  // Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const showToast = (message, type = "success") => {
    setToast({ open: true, message, type });

    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 2200);
  };

  const closeToast = () => setToast((prev) => ({ ...prev, open: false }));

  // --- Fetch notes from DB ---
  const fetchNotes = async () => {
    try {
      const notesDb = await sql("SELECT * FROM notes ORDER BY id DESC");

      const mapped = notesDb.map((note) => ({
        id: note.id,
        title: note.note_title,
        content: note.note_content,
      }));

      setNoteList(mapped);
    } catch (error) {
      console.error("Error fetching notes:", error);
      showToast("Failed to load notes", "error");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // --- CREATE with validation + DB INSERT ---
  async function addNote(newNote) {
    const title = (newNote?.title ?? "").trim();
    const content = (newNote?.content ?? "").trim();

    // Prevent empty notes (both empty)
    if (!title && !content) {
      showToast("Please enter a title or a note.", "error");
      return;
    }

    try {
      // Insert + return inserted row
      const rows = await sql(
        "INSERT INTO notes (note_title, note_content) VALUES ($1, $2) RETURNING *",
        [title, content]
      );

      const inserted = rows?.[0];
      if (inserted) {
        const created = {
          id: inserted.id,
          title: inserted.note_title,
          content: inserted.note_content,
        };

        // Add to UI immediately
        setNoteList((prev) => [created, ...prev]);
        showToast("Note created");
      } else {
        // fallback
        await fetchNotes();
        showToast("Note created");
      }
    } catch (error) {
      console.error("Error creating note:", error);
      showToast("Failed to create note", "error");
    }
  }

  // --- DELETE with confirm + DB DELETE ---
  async function deleteNote(id) {
    const ok = window.confirm("Are you sure you want to delete this note?");
    if (!ok) return;

    try {
      await sql("DELETE FROM notes WHERE id = $1", [id]);

      setNoteList((prev) => prev.filter((n) => n.id !== id));
      showToast("Note deleted");
    } catch (error) {
      console.error("Error deleting note:", error);
      showToast("Failed to delete note", "error");
    }
  }

  // --- EDIT / UPDATE flow ---
  function startEdit(note) {
    setEditingId(note.id);
    setEditTitle(note.title ?? "");
    setEditContent(note.content ?? "");
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  }

  async function saveEdit() {
    const title = editTitle.trim();
    const content = editContent.trim();

    // same validation rule as Create
    if (!title && !content) {
      showToast("Please enter a title or a note.", "error");
      return;
    }

    try {
      const rows = await sql(
        "UPDATE notes SET note_title = $1, note_content = $2 WHERE id = $3 RETURNING *",
        [title, content, editingId]
      );

      const updated = rows?.[0];
      if (updated) {
        setNoteList((prev) =>
          prev.map((n) =>
            n.id === editingId
              ? { id: updated.id, title: updated.note_title, content: updated.note_content }
              : n
          )
        );
      } else {
        // fallback
        await fetchNotes();
      }

      showToast("Note updated");
      cancelEdit();
    } catch (error) {
      console.error("Error updating note:", error);
      showToast("Failed to update note", "error");
    }
  }

  return (
    <div>
      <Header />

      <CreateArea onAdd={addNote} />

      <div className="notes-container">
        {noteList.length === 0 ? (
          <p className="empty-state">No notes yet — add your first one ✨</p>
        ) : (
          noteList.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
              onEdit={() => startEdit(note)}
            />
          ))
        )}
      </div>

      <Footer />

      {/* Toast message */}
      <Toast toast={toast} onClose={closeToast} />

      {/* Edit Modal */}
      {isEditing && (
        <div
          role="dialog"
          aria-modal="true"
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target.classList.contains("modal-overlay")) cancelEdit();
          }}
        >
          <div className="modal">
            <h2>Edit Note</h2>

            <input
              type="text"
              placeholder="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              placeholder="Take a note..."
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={5}
            />

            <div className="modal-actions">
              <button type="button" className="btn secondary" onClick={cancelEdit}>
                Cancel
              </button>
              <button type="button" className="btn primary" onClick={saveEdit}>
                Update
              </button>
            </div>

            <p className="hint">Tip: Title or Note is required (can’t save an empty note).</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;