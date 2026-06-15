const TABS = [
  ["tracking", "Tracking"],
  ["notes", "Notes"],
];

export function ViewTabs({ activeView, onChange }) {
  return (
    <nav className="view-tabs">
      {TABS.map(([key, label]) => (
        <button
          className={`view-tab ${activeView === key ? "is-active" : ""}`}
          key={key}
          onClick={() => onChange(key)}
          type="button"
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
