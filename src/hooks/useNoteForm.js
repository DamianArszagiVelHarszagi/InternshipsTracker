import { useState } from "react";
import { EMPTY_NOTE } from "../data/formDefaults";

export function useNoteForm() {
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [noteEditId, setNoteEditId] = useState(null);
  const [noteForm, setNoteForm] = useState(EMPTY_NOTE);

  const resetNoteForm = () => {
    setNoteForm(EMPTY_NOTE);
    setNoteEditId(null);
  };

  const openNewNoteForm = () => {
    resetNoteForm();
    setIsNoteFormOpen(true);
  };

  const openEditNoteForm = (note) => {
    setNoteForm({ title: note.title, body: note.body });
    setNoteEditId(note.id);
    setIsNoteFormOpen(true);
  };

  const closeNoteForm = () => {
    setIsNoteFormOpen(false);
    resetNoteForm();
  };

  const updateNoteForm = (key, value) => {
    setNoteForm((current) => ({ ...current, [key]: value }));
  };

  return {
    closeNoteForm,
    isNoteFormOpen,
    noteEditId,
    noteForm,
    openEditNoteForm,
    openNewNoteForm,
    updateNoteForm,
  };
}
