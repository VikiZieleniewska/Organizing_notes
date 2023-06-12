import React, { Component } from "react";
import { Button, TextField, Select } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ErrorIcon from "@mui/icons-material/Error";
import SquareIcon from "@mui/icons-material/Square";
import MenuItem from "@mui/material/MenuItem";

export default class NoteCard extends Component {
  state = {
    note: JSON.parse(JSON.stringify(this.props.note)),
    isEditMode: this.props.isEditMode,
    isAddMode: this.props.isEditMode && !this.props.note.id,
  };

  toggleEditMode = () => this.setState({ isEditMode: !this.state.isEditMode });

  addNoteApi = async (note) => {
    return await fetch(`http://localhost:3000/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  editNoteApi = async (note) => {
    return await fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  handleAddNote = async () => {
    const response = await this.addNoteApi(this.state.note);
    if (response.ok) {
      const newNote = await response.json();
      this.setState({
        note: newNote,
        isEditMode: false,
        isAddMode: false,
      });
    }
  };

  handleEditNote = async () => {
    const response = await this.editNoteApi(this.state.note);
    if (response.ok) {
      this.setState({
        isEditMode: false,
        isAddMode: false,
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.isAddMode) {
      this.handleAddNote();
    } else {
      this.handleEditNote();
    }
  };

  handleCancel = () => {
    this.setState({
      note: {
        ...this.props.note,
      },
      isEditMode: false,
    });

    if (this.state.isAddMode) {
      this.handleDelete();
    }
  };

  handleDelete = () => {
    this.props.onDelete(this.props.note.id);
  };

  render() {
    const category = this.props.categories.find(
      (c) => c.id === this.state.note.categoryId
    );

    if (this.state.isEditMode) {
      return (
        <Card
          sx={{
            backgroundColor: category ? category.color : "white",
          }}
        >
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
              subheader={
                <Select
                  id="subheader"
                  variant="standard"
                  fullWidth
                  value={this.state.note.categoryId}
                  onChange={(event) => {
                    this.setState({
                      note: {
                        ...this.state.note,
                        categoryId: event.target.value,
                      },
                    });
                  }}
                >
                  <MenuItem key="no-category" value="">
                    <ListItemText primary="No Category" />
                  </MenuItem>
                  {this.props.categories.map((c) => (
                    <MenuItem
                      key={`${this.state.note.id}-${c.id}`}
                      value={c.id}
                    >
                      <ListItemText primary={c.name} />
                    </MenuItem>
                  ))}
                </Select>
              }
            />
            <CardContent>
              <List>
                {this.state.note.tasks.map((task) => (
                  <ListItem
                    disablePadding
                    key={task.id}
                    secondaryAction={
                      <IconButton
                        aria-label="delete task"
                        edge="end"
                        onClick={() => {
                          const updatedTasks = [...this.state.note.tasks];
                          const filteredTasks = updatedTasks.filter(
                            (el) => el.id !== task.id
                          );

                          this.setState({
                            note: {
                              ...this.state.note,
                              tasks: filteredTasks,
                            },
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <IconButton
                      onClick={(event) => {
                        const updatedTasks = [...this.state.note.tasks];
                        const currentStatus = updatedTasks.find(
                          (el) => el.id === task.id
                        ).isImportant;

                        updatedTasks.find(
                          (el) => el.id === task.id
                        ).isImportant = !currentStatus;

                        this.setState({
                          note: {
                            ...this.state.note,
                            tasks: updatedTasks,
                          },
                        });
                      }}
                    >
                      {task.isImportant ? (
                        <ErrorIcon color="error" />
                      ) : (
                        <ErrorOutlineIcon />
                      )}
                    </IconButton>
                    <TextField
                      id={`task-${task.id}`}
                      variant="standard"
                      // multiline
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
                <ListItem
                  disablePadding
                  key="add-task"
                  sx={{ justifyContent: "center" }}
                >
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const updatedTasks = [...this.state.note.tasks];
                      const lastId = Math.max(...updatedTasks.map((t) => t.id));
                      const emptyTask = {
                        id: lastId + 1,
                        description: "",
                        isDone: false,
                      };

                      updatedTasks.push(emptyTask);

                      this.setState({
                        note: {
                          ...this.state.note,
                          tasks: updatedTasks,
                        },
                      });
                    }}
                  >
                    Add Task
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </form>
        </Card>
      );
    }

    return (
      <Card
        sx={{
          backgroundColor: category ? category.color : "white",
        }}
      >
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
          subheader={category ? category.name : "No Category"}
        />
        <CardContent>
          <List>
            {this.state.note.tasks.map((task) => (
              <ListItem disablePadding key={task.id}>
                <ListItemButton
                  onClick={(event) => {
                    const updatedTasks = [...this.state.note.tasks];
                    const currentStatus = updatedTasks.find(
                      (el) => el.id === task.id
                    ).isDone;
                    updatedTasks.find((el) => el.id === task.id).isDone =
                      !currentStatus;

                    this.setState({
                      note: {
                        ...this.state.note,
                        tasks: updatedTasks,
                      },
                    });

                    this.handleEditNote();
                  }}
                >
                  <ListItemIcon>
                    {task.isDone ? (
                      <CheckCircleIcon color="success" />
                    ) : task.isImportant ? (
                      <CheckCircleOutlineIcon color="error" />
                    ) : (
                      <CheckCircleOutlineIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={task.description}
                    sx={{
                      textDecoration: task.isDone ? "line-through" : "none",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }
}
