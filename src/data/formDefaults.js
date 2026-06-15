export const EMPTY_NOTE = { title: "", body: "" };

export const createEmptyInternshipForm = () => ({
  company: "",
  city: "Shanghai",
  website: "",
  email: "",
  dateSent: new Date().toISOString().split("T")[0],
  status: "Not contacted",
  notes: "",
});
