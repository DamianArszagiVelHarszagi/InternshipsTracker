import { CITIES, STATUSES } from "../data/constants";

export const filterInternships = (internships, city, status, search) => {
  const query = search.trim().toLowerCase();

  return internships
    .filter((item) => city === "All" || item.city === city)
    .filter((item) => status === "All" || item.status === status)
    .filter((item) => {
      if (!query) return true;
      return item.company.toLowerCase().includes(query) || item.city.toLowerCase().includes(query);
    });
};

export const filterNotes = (notes, search) => {
  const query = search.trim().toLowerCase();
  if (!query) return notes;

  return notes.filter((note) => (
    note.title.toLowerCase().includes(query) || note.body.toLowerCase().includes(query)
  ));
};

export const getStatusCounts = (internships) => (
  STATUSES.reduce((counts, status) => {
    counts[status] = internships.filter((item) => item.status === status).length;
    return counts;
  }, {})
);

export const getCityCounts = (internships) => (
  CITIES.slice(1).reduce((counts, city) => {
    counts[city] = internships.filter((item) => item.city === city).length;
    return counts;
  }, {})
);

const daysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
};

export const countSentInPeriod = (internships, days) => (
  internships.filter((item) => item.dateSent && item.dateSent >= daysAgo(days)).length
);
