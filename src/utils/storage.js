const INTERNSHIPS_STORAGE_KEY = "internship-v1";
const NOTES_STORAGE_KEY = "internship-notes-v1";

const readStorage = async (key) => {
  if (window.storage?.get) return window.storage.get(key);
  return { value: localStorage.getItem(key) };
};

const writeStorage = async (key, value) => {
  if (window.storage?.set) return window.storage.set(key, value);
  localStorage.setItem(key, value);
  return undefined;
};

export const getInternshipsStorage = () => readStorage(INTERNSHIPS_STORAGE_KEY);
export const setInternshipsStorage = (value) => writeStorage(INTERNSHIPS_STORAGE_KEY, value);

export const getNotesStorage = () => readStorage(NOTES_STORAGE_KEY);
export const setNotesStorage = (value) => writeStorage(NOTES_STORAGE_KEY, value);
