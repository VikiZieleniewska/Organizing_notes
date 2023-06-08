import React, { Component } from "react";
import { Alert, Button, TextField, Typography } from "@mui/material";
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
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default class NoteCard extends Component {
  state = {
    note: JSON.parse(JSON.stringify(this.props.note)),
    isEditMode: false,
  };

  // componentDidUpdate() {}

  toggleEditMode = () => this.setState({ isEditMode: !this.state.isEditMode });

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`submitted form`);
  };

  handleCancel = () => {
    this.setState({
      note: {
        ...this.props.note,
      },
      isEditMode: false,
    });
  };

  handleDelete = async (event) => {
    console.log(`note deleted`);
  };

  render() {
    if (this.state.isEditMode) {
      return (
        <Card>
          <form onSubmit={this.handleSubmit}>
            <CardHeader
              action={
                <>
                  <IconButton type="submit" aria-label="save">
                    <SaveIcon />
                  </IconButton>
                  <IconButton aria-label="cancel" onClick={this.handleCancel}>
                    <CloseIcon />
                  </IconButton>
                </>
              }
              title={
                <TextField
                  id="title"
                  variant="standard"
                  fullWidth
                  value={this.state.note.title}
                  onChange={(event) => {
                    this.setState({
                      note: {
                        ...this.state.note,
                        title: event.target.value,
                      },
                    });
                  }}
                  // sx={{ marginBottom: "20px" }}
                />
              }
            />
            <CardContent>
              <List>
                {this.state.note.tasks.map((task) => (
                  <ListItem disablePadding key={task.id}>
                    <TextField
                      id={`task-${task.id}`}
                      variant="standard"
                      fullWidth
                      value={task.description}
                      onChange={(event) => {
                        const updatedTasks = [...this.state.note.tasks];
                        updatedTasks.find(
                          (el) => el.id === task.id
                        ).description = event.target.value;

                        this.setState({
                          note: {
                            ...this.state.note,
                            tasks: updatedTasks,
                          },
                        });
                      }}
                      // sx={{ marginBottom: "20px" }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </form>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader
          action={
            <>
              <IconButton aria-label="edit" onClick={this.toggleEditMode}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={this.handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          }
          title={this.state.note.title}
        />
        <CardContent>
          <List>
            {this.state.note.tasks.map((task) => (
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
}
