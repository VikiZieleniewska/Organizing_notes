import { useEffect, useState } from "react";

import BasicAppBar from "./components/BasicAppBar/BasicAppBar";
import NotesBoard from "./components/NotesBoard/NotesBoard";
import NoteSearch from "./components/NoteSearch/NoteSearch";

import "./App.scss";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState({
    searchText: "",
    selectedCategory: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    getNotes(controller.signal).then((data) => setNotes(data));

    return () => {
      controller.abort();
    };
  }, []);

  async function getNotes(signal) {
    const response = await fetch("http://localhost:3000/notes", {
      signal,
    });
    return await response.json();
  }

  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller.signal).then((data) => setCategories(data));

    return () => {
      controller.abort();
    };
  }, []);

  async function getCategories(signal) {
    const response = await fetch("http://localhost:3000/categories", {
      signal,
    });
    return await response.json();
  }

  // useEffect(() => setSearch({ searchText: "", selectedCategory: "" }));

  function handleAddNote() {
    const emptyNote = {
      id: 0,
      categoryId: "",
      title: "",
      tasks: [],
    };
    setNotes([emptyNote, ...notes]);
  }

  function handleEditNote(note) {
    const index = notes.findIndex((el) => el.id === note.id);
    notes[index] = note;

    setNotes([...notes]);
  }

  function handleUpdateCategories(updatedCategories) {
    setCategories(updatedCategories);
  }

  function handleSearch(searchOptions) {
    setSearch(searchOptions);
  }

  async function handleDelete(noteId) {
    if (noteId === null || noteId === undefined) {
      console.error("NoteID is required");

      return;
    }

    if (noteId === 0) {
      setNotes(notes.filter((n) => n.id !== noteId));

      return;
    }

    const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setNotes(notes.filter((n) => n.id !== noteId));
    }
  }

  return (
    <>
      <BasicAppBar
        categories={categories}
        onUpdateCategories={handleUpdateCategories}
        onAddNote={handleAddNote}
      />
      <NoteSearch
        categories={categories}
        search={search}
        onSearch={handleSearch}
      />
      <NotesBoard
        notes={notes}
        categories={categories}
        search={search}
        onEditNote={handleEditNote}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
