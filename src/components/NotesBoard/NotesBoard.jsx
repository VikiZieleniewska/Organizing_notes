import React, { Component } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import NoteCard from "../NoteCard/NoteCard.jsx";

export default class NotesBoard extends Component {
  render() {
    const { notes, categories, search, onAddNote, onEditNote, onDelete } =
      this.props;
    if (!notes) {
      return <h1>Notes loading</h1>;
    }

    let filteredNotes = notes;

    if (search.searchText && search.searchText.trim()) {
      const searchText = search.searchText.toLowerCase();
      filteredNotes = filteredNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchText) ||
          note.tasks.some((task) =>
            task.description.toLowerCase().includes(searchText)
          )
      );
    }

    if (search.selectedCategory) {
      filteredNotes = filteredNotes.filter(
        (note) => note.categoryId === search.selectedCategory
      );
    }

    if (search.importance && search.importance.trim()) {
      const isImportant = search.importance === "Important";

      filteredNotes = filteredNotes.filter((note) =>
        note.tasks.some((task) => task.isImportant === isImportant)
      );
    }

    if (search.status && search.status.trim()) {
      const isDone = search.status === "Done";

      filteredNotes = filteredNotes.filter((note) =>
        note.tasks.some((task) => task.isDone === isDone)
      );
    }

    return (
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {filteredNotes.map((note) => {
            return (
              <Grid xs={12} sm={6} md={4} key={`note-${note.id}`}>
                <NoteCard
                  note={note}
                  categories={categories}
                  isEditMode={!note.id}
                  onAddNote={onAddNote}
                  onEditNote={onEditNote}
                  onDelete={onDelete}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }
}
