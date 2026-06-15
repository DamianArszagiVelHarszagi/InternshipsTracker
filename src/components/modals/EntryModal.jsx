import { CITIES, STATUSES } from "../../data/constants";

const FIELDS = [
  ["Bedrijf *", "company", "text", null],
  ["Stad", "city", "select", CITIES.slice(1)],
  ["Website", "website", "text", null],
  ["E-mail", "email", "text", null],
  ["Datum verzonden", "dateSent", "date", null],
  ["Status", "status", "select", STATUSES],
];

export function EntryModal({
  form,
  onChange,
  onClose,
  onSubmit,
  retrySourceCompany,
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
          <h2 className="modal__title">
            {retrySourceCompany ? `Nieuwe poging voor ${retrySourceCompany}` : "Nieuwe internship sending"}
          </h2>
          <button className="btn btn--icon" onClick={onClose} type="button">
            x
          </button>
        </div>

        <div className="form-grid">
          {FIELDS.map(([label, key, type, options]) => (
            <div className={key === "company" ? "form-field--wide" : ""} key={key}>
              <label className="field-label">{label}</label>
              {type === "select" ? (
                <select onChange={(event) => onChange(key, event.target.value)} value={form[key]}>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  onChange={(event) => onChange(key, event.target.value)}
                  placeholder={label.replace(" *", "")}
                  type={type}
                  value={form[key]}
                />
              )}
            </div>
          ))}

          <div className="form-field--wide">
            <label className="field-label">Notes</label>
            <textarea
              className="textarea"
              onChange={(event) => onChange("notes", event.target.value)}
              placeholder="Optionele notes..."
              rows={2}
              value={form.notes}
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn--ghost" onClick={onClose} type="button">
            Annuleren
          </button>
          <button className="btn btn--primary" onClick={onSubmit} type="button">
            {retrySourceCompany ? "Poging toevoegen" : "Toevoegen"}
          </button>
        </div>
      </section>
    </div>
  );
}
