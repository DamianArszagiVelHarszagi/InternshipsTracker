export const CITIES = ["All", "Beijing", "Shanghai", "Shenzhen", "Guangzhou", "Hangzhou", "Chengdu"];

export const STATUSES = [
  "Not contacted",
  "Mail sent",
  "No answer",
  "Rejected",
  "Answered",
  "Interview",
];

export const STATUS_STYLES = {
  "Not contacted": { bg: "#eef1eb", color: "#66746c", border: "#9aa79c" },
  "Mail sent": { bg: "#e6f0ef", color: "#2c7a7b", border: "#2f6f63" },
  "No answer": { bg: "#fff4d7", color: "#8a5d12", border: "#d5a23b" },
  Rejected: { bg: "#fdeceb", color: "#a8463f", border: "#dfa29d" },
  Answered: { bg: "#e6f4ea", color: "#2f6f43", border: "#85b98c" },
  Interview: { bg: "#eeeaf6", color: "#6f579d", border: "#b9acd8" },
};

export const STATUS_ICON = {
  "Not contacted": "o",
  "Mail sent": ">",
  "No answer": "...",
  Rejected: "x",
  Answered: "O",
  Interview: "*",
};

export const displayCity = (city) => (city === "Chengdu" ? "Chengdu/Chongqing" : city);
