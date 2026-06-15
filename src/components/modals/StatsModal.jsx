import { CITIES, STATUSES, STATUS_ICON, STATUS_STYLES, displayCity } from "../../data/constants";
import { countSentInPeriod } from "../../utils/internshipSelectors";

const PERIODS = [
  ["7 dagen", 7],
  ["1 maand", 30],
  ["3 maanden", 90],
  ["6 maanden", 180],
];

export function StatsModal({ cityCounts, internships, onClose, statusCounts }) {
  const maxStatus = Math.max(...STATUSES.map((status) => statusCounts[status]), 1);
  const maxCity = Math.max(...CITIES.slice(1).map((city) => cityCounts[city] || 0), 1);

  return (
    <div
      className="modal-backdrop modal-backdrop--stats"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="modal modal--stats">
        <div className="modal__header">
          <div>
            <h2 className="modal__title">Statistieken</h2>
            <div className="modal__subtitle">{internships.length} bedrijven bijgehouden</div>
          </div>
          <button className="btn btn--icon" onClick={onClose} type="button">
            x
          </button>
        </div>

        <section className="stats-section">
          <h3 className="stats-section__title">Verzendingen</h3>
          <div className="stats-grid">
            {PERIODS.map(([label, days]) => (
              <div className="stat-card" key={days}>
                <div className="stat-card__value">{countSentInPeriod(internships, days)}</div>
                <div className="stat-card__label">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-section">
          <h3 className="stats-section__title">Status</h3>
          <div className="stat-list">
            {STATUSES.map((status) => {
              const count = statusCounts[status];
              const pct = Math.round((count / maxStatus) * 100);
              const statusStyle = STATUS_STYLES[status];

              return (
                <div
                  className="stat-row"
                  key={status}
                  style={{
                    "--bar-color": statusStyle.border,
                    "--bar-width": `${pct}%`,
                    "--row-color": statusStyle.color,
                  }}
                >
                  <div className="stat-row__label">
                    <span className="status__icon">{STATUS_ICON[status]}</span>
                    {status}
                  </div>
                  <div className="stat-row__track">
                    <div className="stat-row__bar" />
                  </div>
                  <div className="stat-row__count">{count}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="stats-section">
          <h3 className="stats-section__title">Per stad</h3>
          <div className="stat-list">
            {CITIES.slice(1).map((city) => {
              const count = cityCounts[city] || 0;
              const pct = Math.round((count / maxCity) * 100);

              return (
                <div
                  className="stat-row"
                  key={city}
                  style={{
                    "--bar-color": "#2f8f80",
                    "--bar-width": `${pct}%`,
                    "--row-color": "#2c7a7b",
                  }}
                >
                  <div className="stat-row__label">{displayCity(city)}</div>
                  <div className="stat-row__track">
                    <div className="stat-row__bar" />
                  </div>
                  <div className="stat-row__count">{count}</div>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
}
