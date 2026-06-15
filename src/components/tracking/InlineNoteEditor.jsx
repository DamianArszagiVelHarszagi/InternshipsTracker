import { useState } from "react";

export function InlineNoteEditor({ notes, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(notes || "");

  const startEditing = () => {
    setDraft(notes || "");
    setEditing(true);
  };

  const cancelEditing = () => {
    setDraft(notes || "");
    setEditing(false);
  };

  const saveDraft = () => {
    onSave(draft);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="inline-note-edit">
        <input
          autoFocus
          className="inline-note-edit__input"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") saveDraft();
            if (event.key === "Escape") cancelEditing();
          }}
          value={draft}
        />
        <button className="btn btn--primary btn--mini" onClick={saveDraft} type="button">
          Save
        </button>
      </div>
    );
  }

  return (
    <button
      className={`inline-note ${notes ? "" : "is-empty"}`}
      onClick={startEditing}
      title={notes || "Klik om note te bewerken"}
      type="button"
    >
      {notes || "+"}
    </button>
  );
}
