import { formatNoteDate } from "../../utils/formatters";

export function NotesView({
  filteredNotes,
  noteSearch,
  notes,
  onDeleteNote,
  onEditNote,
  onSearchChange,
}) {
  return (
    <>
      <section className="notes-toolbar">
        <div className="notes-toolbar__meta">
          <span className="notes-toolbar__title">Notes</span>
          <span className="count-pill">{notes.length}</span>
        </div>
        <input
          className="notes-search"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Zoek notes..."
          value={noteSearch}
        />
      </section>

      <section className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">Geen notes gevonden</div>
        ) : (
          filteredNotes.map((note) => (
            <article className="note-card" key={note.id}>
              <div className="note-card__header">
                <div>
                  <h2 className="note-card__title">{note.title}</h2>
                  <div className="note-card__date">{formatNoteDate(note.createdAt)}</div>
                </div>

                <div className="note-card__actions">
                  <button className="btn btn--primary btn--mini" onClick={() => onEditNote(note)} type="button">
                    Bewerk
                  </button>
                  <button
                    className="btn btn--ghost btn--mini btn--text-danger"
                    onClick={() => onDeleteNote(note.id)}
                    title="Verwijder"
                    type="button"
                  >
                    x
                  </button>
                </div>
              </div>

              <div className="note-card__body">
                {note.body || <span className="empty-cell">Geen details</span>}
              </div>
            </article>
          ))
        )}
      </section>

      <div className="list-footer">
        {filteredNotes.length} van {notes.length} notes
      </div>
    </>
  );
}
