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

  return (
    <>
      <BasicAppBar />
      <NotesBoard notes={notes} />
      {/* <div>Hello World!</div> */}
    </>
  );
}

export default App;
