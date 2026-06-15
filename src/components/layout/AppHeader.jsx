import { CITIES } from "../../data/constants";

export function AppHeader({
  internshipCount,
  onExport,
  onImport,
  onNewEntry,
  onNewNote,
  onShowStats,
  view,
}) {
  const handleCreate = () => {
    if (view === "tracking") {
      onNewEntry();
      return;
    }

    onNewNote();
  };

  return (
    <header className="app-header">
      <div>
        <div className="app-header__brand-row">
          <span className="app-header__mark">CN</span>
          <h1 className="app-header__title">China Internship Tracker</h1>
        </div>
        <p className="app-header__meta">
          {internshipCount} bedrijven bijgehouden across {CITIES.length - 1} steden
        </p>
      </div>

      <div className="app-header__actions">
        <button className="btn btn--ghost" onClick={onShowStats} type="button">
          Statistieken
        </button>
        <button className="btn btn--ghost" onClick={onExport} type="button">
          Export
        </button>
        <label className="btn btn--ghost">
          Import
          <input className="hidden-input" accept=".json" onChange={onImport} type="file" />
        </label>
        <button className="btn btn--primary" onClick={handleCreate} type="button">
          <span className="btn__plus">+</span>
          {view === "tracking" ? "Nieuwe sending" : "Nieuwe note"}
        </button>
      </div>
    </header>
  );
}
