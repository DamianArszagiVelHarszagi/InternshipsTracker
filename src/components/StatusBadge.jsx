import { useState } from "react";
import { STATUSES, STATUS_ICON, STATUS_STYLES } from "../data/constants";

export function StatusBadge({ status, onChange, size = "sm" }) {
  const [open, setOpen] = useState(false);
  const currentStyle = STATUS_STYLES[status] || STATUS_STYLES["Not contacted"];

  const styleVars = {
    "--status-bg": currentStyle.bg,
    "--status-color": currentStyle.color,
    "--status-border": currentStyle.border,
  };

  return (
    <div className="status">
      <button
        className={`status__button status__button--${size}`}
        onClick={() => setOpen((value) => !value)}
        style={styleVars}
        type="button"
      >
        <span className="status__icon">{STATUS_ICON[status]}</span>
        {status}
      </button>

      {open && (
        <div className="status__menu">
          {STATUSES.map((nextStatus) => {
            const statusStyle = STATUS_STYLES[nextStatus];

            return (
              <button
                className={`status__option ${nextStatus === status ? "is-active" : ""}`}
                key={nextStatus}
                onClick={() => {
                  onChange(nextStatus);
                  setOpen(false);
                }}
                style={{
                  "--status-bg": statusStyle.bg,
                  "--status-color": statusStyle.color,
                }}
                type="button"
              >
                <span className="status__icon">{STATUS_ICON[nextStatus]}</span>
                {nextStatus}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
