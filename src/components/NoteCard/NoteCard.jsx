import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function NoteCard({ note }) {
  return (
    <Card>
      <CardHeader
        action={
          <>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </>
        }
        title={note.title}
      />
      <CardContent>
        <List>
          {note.tasks.map((task) => (
            <ListItem disablePadding key={task.id}>
              <ListItemButton>
                <ListItemIcon>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={task.description} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default NoteCard;
