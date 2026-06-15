export function NoteModal({
  isEditing,
  noteForm,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="modal">
        <div className="modal__header">
          <h2 className="modal__title">{isEditing ? "Note bewerken" : "Nieuwe note"}</h2>
          <button className="btn btn--icon" onClick={onClose} type="button">
            x
          </button>
        </div>

        <div className="form-grid form-grid--single">
          <div>
            <label className="field-label">Naam *</label>
            <input
              onChange={(event) => onChange("title", event.target.value)}
              placeholder="Naam of titel"
              type="text"
              value={noteForm.title}
            />
          </div>
          <div>
            <label className="field-label">Notes</label>
            <textarea
              className="textarea"
              onChange={(event) => onChange("body", event.target.value)}
              placeholder="Schrijf hier je notes, offer details of algemene info."
              rows={6}
              value={noteForm.body}
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn--ghost" onClick={onClose} type="button">
            Annuleren
          </button>
          <button className="btn btn--primary" onClick={onSubmit} type="button">
            Opslaan
          </button>
        </div>
      </section>
    </div>
  );
}
