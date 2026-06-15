import { useState } from "react";
import { createEmptyInternshipForm } from "../data/formDefaults";

export function useEntryForm() {
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [entryForm, setEntryForm] = useState(createEmptyInternshipForm);
  const [retrySourceCompany, setRetrySourceCompany] = useState(null);

  const openEntryForm = () => {
    setEntryForm(createEmptyInternshipForm());
    setRetrySourceCompany(null);
    setIsEntryFormOpen(true);
  };

  const openRetryForm = (entry) => {
    setEntryForm({
      ...createEmptyInternshipForm(),
      company: entry.company,
      city: entry.city || "Shanghai",
      website: entry.website || "",
      email: entry.email || "",
      position: entry.position || "",
    });
    setRetrySourceCompany(entry.company);
    setIsEntryFormOpen(true);
  };

  const closeEntryForm = () => {
    setIsEntryFormOpen(false);
    setRetrySourceCompany(null);
    setEntryForm(createEmptyInternshipForm());
  };

  const updateEntryForm = (key, value) => {
    setEntryForm((current) => ({ ...current, [key]: value }));
  };

  return {
    closeEntryForm,
    entryForm,
    isEntryFormOpen,
    openEntryForm,
    openRetryForm,
    retrySourceCompany,
    updateEntryForm,
  };
}
