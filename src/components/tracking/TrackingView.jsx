import { CITIES, STATUSES, STATUS_ICON, displayCity } from "../../data/constants";
import { formatShortDate, formatWebsite, getWebsiteHref } from "../../utils/formatters";
import { StatusBadge } from "../StatusBadge";
import { InlineNoteEditor } from "./InlineNoteEditor";

export function TrackingView({
  city,
  cityCounts,
  filteredInternships,
  filterStatus,
  internships,
  onCityChange,
  onDelete,
  onRetry,
  onSearchChange,
  onStatusChange,
  onStatusFilterChange,
  onUpdateNotes,
  search,
}) {
  const visibleColumnCount = city === "All" ? 8 : 7;

  return (
    <>
      <section className="tracking-toolbar">
        <div className="city-tabs">
          {CITIES.map((cityName) => {
            const count = cityName === "All" ? internships.length : cityCounts[cityName] || 0;

            return (
              <button
                className={`city-tab ${city === cityName ? "is-active" : ""}`}
                key={cityName}
                onClick={() => onCityChange(cityName)}
                type="button"
              >
                {displayCity(cityName)}
                <span className="count-pill">{count}</span>
              </button>
            );
          })}
        </div>

        <select
          className="toolbar-select"
          onChange={(event) => onStatusFilterChange(event.target.value)}
          value={filterStatus}
        >
          <option value="All">Alle statussen</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_ICON[status]} {status}
            </option>
          ))}
        </select>

        <input
          className="toolbar-search"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Zoek bedrijf..."
          value={search}
        />
      </section>

      <section className="table-shell">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Bedrijf</th>
                {city === "All" && <th>Stad</th>}
                <th>Website</th>
                <th>E-mail</th>
                <th>Datum</th>
                <th>Status</th>
                <th>Notes</th>
                <th className="data-table__actions" />
              </tr>
            </thead>
            <tbody>
              {filteredInternships.length === 0 && (
                <tr>
                  <td className="empty-state" colSpan={visibleColumnCount}>
                    Geen resultaten gevonden
                  </td>
                </tr>
              )}

              {filteredInternships.map((row) => (
                <tr className="data-table__row" key={row.id}>
                  <td className="data-table__company">{row.company}</td>

                  {city === "All" && (
                    <td>
                      <span className="city-chip">{row.city}</span>
                    </td>
                  )}

                  <td className="data-table__website">
                    {row.website ? (
                      <a
                        className="company-link"
                        href={getWebsiteHref(row.website)}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {formatWebsite(row.website)}
                      </a>
                    ) : (
                      <span className="empty-cell">-</span>
                    )}
                  </td>

                  <td className="data-table__email">
                    {row.email || <span className="empty-cell">-</span>}
                  </td>

                  <td className="data-table__date">
                    {formatShortDate(row.dateSent) || <span className="empty-cell">-</span>}
                  </td>

                  <td>
                    <StatusBadge status={row.status} onChange={(status) => onStatusChange(row.id, status)} />
                  </td>

                  <td className="data-table__notes">
                    <InlineNoteEditor notes={row.notes} onSave={(notes) => onUpdateNotes(row.id, notes)} />
                  </td>

                  <td>
                    <div className="row-actions">
                      <button
                        className="btn btn--soft btn--mini"
                        onClick={() => onRetry(row)}
                        title="Nog een poging toevoegen met deze bedrijfsinfo"
                        type="button"
                      >
                        Opnieuw
                      </button>
                      <button
                        className="btn btn--icon"
                        onClick={() => onDelete(row.id)}
                        title="Verwijder"
                        type="button"
                      >
                        x
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          {filteredInternships.length} van {internships.length} bedrijven
        </div>
      </section>
    </>
  );
}
