import { useEffect, useState } from "react";

import BasicAppBar from "./components/BasicAppBar/BasicAppBar";
import NotesBoard from "./components/NotesBoard/NotesBoard";

import "./App.scss";

function App() {
  const [notes, setNotes] = useState([]);

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

  function handleAddNote() {
    const emptyNote = {
      id: 0,
      title: "",
      tasks: [],
    };
    setNotes([emptyNote, ...notes]);
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
      <BasicAppBar onAddNote={handleAddNote} />
      <NotesBoard notes={notes} onDelete={handleDelete} />
    </>
  );
}

export default App;
