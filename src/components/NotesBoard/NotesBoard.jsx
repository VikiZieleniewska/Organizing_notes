import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import NoteCard from "../NoteCard/NoteCard.jsx";

function NotesBoard({ notes }) {
  if (!notes) {
    return <h1>Notes loading</h1>;
  }

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 3, sm: 9, md: 12 }}
      >
        {notes.map((note, index) => (
          <Grid xs={3} sm={3} md={3} key={index}>
            <NoteCard note={note} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NotesBoard;

{
  /* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 9, md: 12 }}>
  {notes.map((_, index) => (
    <Grid xs={3} sm={3} md={3} key={index}>
      <Item>xs={index}</Item>
    </Grid>
  ))}
</Grid>; */
}
