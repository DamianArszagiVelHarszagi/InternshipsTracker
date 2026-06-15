export const getWebsiteHref = (website) => {
  if (!website) return "";
  return website.startsWith("http") ? website : `https://${website}`;
};

export const formatWebsite = (website) => (
  website.replace(/https?:\/\//, "").replace(/\/$/, "")
);

export const formatShortDate = (dateSent) => (
  dateSent ? dateSent.replace("2026-", "") : ""
);

export const formatNoteDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
