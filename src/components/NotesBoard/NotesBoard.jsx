import React, { Component } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import NoteCard from "../NoteCard/NoteCard.jsx";

export default class NotesBoard extends Component {
  render() {
    const { notes, search, onDelete } = this.props;
    if (!notes) {
      return <h1>Notes loading</h1>;
    }

    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.tasks.some((task) =>
          task.description.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {filteredNotes.map((note) => (
            <Grid xs={12} sm={6} md={4} key={note.id}>
              <NoteCard note={note} isEditMode={!note.id} onDelete={onDelete} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}
