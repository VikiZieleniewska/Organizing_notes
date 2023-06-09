import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import NoteCard from "../NoteCard/NoteCard.jsx";

function NotesBoard({ notes, onDelete }) {
  if (!notes) {
    return <h1>Notes loading</h1>;
  }

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {notes.map((note) => (
          <Grid xs={12} sm={6} md={4} key={note.id}>
            <NoteCard note={note} isEditMode={!note.id} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NotesBoard;
