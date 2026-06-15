import { useEffect, useState } from "react";
import { INITIAL_INTERNSHIPS } from "../data/initialInternships";
import {
  getInternshipsStorage,
  getNotesStorage,
  setInternshipsStorage,
  setNotesStorage,
} from "../utils/storage";

export function useTrackerData() {
  const [internships, setInternships] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const internshipsResult = await getInternshipsStorage();
        const notesResult = await getNotesStorage();

        if (!active) return;

        if (internshipsResult?.value) {
          setInternships(JSON.parse(internshipsResult.value));
        } else {
          setInternships(INITIAL_INTERNSHIPS);
          await setInternshipsStorage(JSON.stringify(INITIAL_INTERNSHIPS));
        }

        if (notesResult?.value) {
          setNotes(JSON.parse(notesResult.value));
        } else {
          setNotes([]);
          await setNotesStorage(JSON.stringify([]));
        }
      } catch {
        if (!active) return;
        setInternships(INITIAL_INTERNSHIPS);
        setNotes([]);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const saveInternships = async (next) => {
    setInternships(next);
    try {
      await setInternshipsStorage(JSON.stringify(next));
    } catch {
      // State still updates if persistent storage is unavailable.
    }
  };

  const saveNotes = async (next) => {
    setNotes(next);
    try {
      await setNotesStorage(JSON.stringify(next));
    } catch {
      // State still updates if persistent storage is unavailable.
    }
  };

  const updateStatus = (id, status) => (
    saveInternships(internships.map((item) => (item.id === id ? { ...item, status } : item)))
  );

  const updateInternshipNotes = (id, notesValue) => (
    saveInternships(internships.map((item) => (item.id === id ? { ...item, notes: notesValue } : item)))
  );

  const deleteInternship = (id) => {
    const entry = internships.find((item) => item.id === id);
    if (window.confirm(`"${entry?.company}" verwijderen?`)) {
      saveInternships(internships.filter((item) => item.id !== id));
    }
  };

  const addInternship = (entry) => {
    if (!entry.company.trim()) return false;
    saveInternships([...internships, { ...entry, company: entry.company.trim(), id: Date.now() }]);
    return true;
  };

  const upsertNote = (noteForm, noteEditId) => {
    if (!noteForm.title.trim()) return false;

    if (noteEditId) {
      saveNotes(notes.map((note) => (
        note.id === noteEditId ? { ...note, title: noteForm.title, body: noteForm.body } : note
      )));
    } else {
      saveNotes([...notes, { ...noteForm, id: Date.now(), createdAt: new Date().toISOString() }]);
    }

    return true;
  };

  const deleteNote = (id) => saveNotes(notes.filter((note) => note.id !== id));

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ internships, notes }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `internships-backup-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      try {
        const parsed = JSON.parse(readerEvent.target.result);
        if (!parsed.internships) {
          alert("Ongeldig bestandsformaat");
          return;
        }

        const noteCount = parsed.notes?.length ?? 0;
        const message = `${parsed.internships.length} bedrijven en ${noteCount} notes importeren? Huidige data wordt overschreven.`;
        if (!window.confirm(message)) return;

        saveInternships(parsed.internships);
        if (parsed.notes) saveNotes(parsed.notes);
      } catch {
        alert("Ongeldig bestandsformaat");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return {
    internships,
    notes,
    isLoading: !internships || notes === null,
    addInternship,
    deleteInternship,
    deleteNote,
    exportData,
    importData,
    updateInternshipNotes,
    updateStatus,
    upsertNote,
  };
}
