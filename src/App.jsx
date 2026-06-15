import { useState } from "react";
import { AppHeader } from "./components/layout/AppHeader";
import { ViewTabs } from "./components/layout/ViewTabs";
import { EntryModal } from "./components/modals/EntryModal";
import { NoteModal } from "./components/modals/NoteModal";
import { StatsModal } from "./components/modals/StatsModal";
import { NotesView } from "./components/notes/NotesView";
import { TrackingView } from "./components/tracking/TrackingView";
import { useEntryForm } from "./hooks/useEntryForm";
import { useNoteForm } from "./hooks/useNoteForm";
import { useTrackerData } from "./hooks/useTrackerData";
import {
  filterInternships,
  filterNotes,
  getCityCounts,
  getStatusCounts,
} from "./utils/internshipSelectors";
import "./styles/app.css";

export default function App() {
  const [city, setCity] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [noteSearch, setNoteSearch] = useState("");
  const [search, setSearch] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [view, setView] = useState("tracking");

  const {
    addInternship,
    deleteInternship,
    deleteNote,
    exportData,
    importData,
    internships,
    isLoading,
    notes,
    updateInternshipNotes,
    updateStatus,
    upsertNote,
  } = useTrackerData();

  const entryForm = useEntryForm();
  const noteForm = useNoteForm();

  if (isLoading) {
    return <div className="loading-screen">Laden...</div>;
  }

  const cityCounts = getCityCounts(internships);
  const statusCounts = getStatusCounts(internships);
  const filteredInternships = filterInternships(internships, city, filterStatus, search);
  const filteredNotes = filterNotes(notes, noteSearch);

  const handleAddEntry = () => {
    if (addInternship(entryForm.entryForm)) {
      entryForm.closeEntryForm();
    }
  };

  const handleSaveNote = () => {
    if (upsertNote(noteForm.noteForm, noteForm.noteEditId)) {
      noteForm.closeNoteForm();
    }
  };

  return (
    <div className="app-shell">
      <AppHeader
        internshipCount={internships.length}
        onExport={exportData}
        onImport={importData}
        onNewEntry={entryForm.openEntryForm}
        onNewNote={noteForm.openNewNoteForm}
        onShowStats={() => setShowStats(true)}
        view={view}
      />

      <ViewTabs activeView={view} onChange={setView} />

      {view === "tracking" ? (
        <TrackingView
          city={city}
          cityCounts={cityCounts}
          filteredInternships={filteredInternships}
          filterStatus={filterStatus}
          internships={internships}
          onCityChange={setCity}
          onDelete={deleteInternship}
          onRetry={entryForm.openRetryForm}
          onSearchChange={setSearch}
          onStatusChange={updateStatus}
          onStatusFilterChange={setFilterStatus}
          onUpdateNotes={updateInternshipNotes}
          search={search}
        />
      ) : (
        <NotesView
          filteredNotes={filteredNotes}
          noteSearch={noteSearch}
          notes={notes}
          onDeleteNote={deleteNote}
          onEditNote={noteForm.openEditNoteForm}
          onSearchChange={setNoteSearch}
        />
      )}

      {entryForm.isEntryFormOpen && (
        <EntryModal
          form={entryForm.entryForm}
          onChange={entryForm.updateEntryForm}
          onClose={entryForm.closeEntryForm}
          onSubmit={handleAddEntry}
          retrySourceCompany={entryForm.retrySourceCompany}
        />
      )}

      {showStats && (
        <StatsModal
          cityCounts={cityCounts}
          internships={internships}
          onClose={() => setShowStats(false)}
          statusCounts={statusCounts}
        />
      )}

      {noteForm.isNoteFormOpen && (
        <NoteModal
          isEditing={Boolean(noteForm.noteEditId)}
          noteForm={noteForm.noteForm}
          onChange={noteForm.updateNoteForm}
          onClose={noteForm.closeNoteForm}
          onSubmit={handleSaveNote}
        />
      )}
    </div>
  );
}
