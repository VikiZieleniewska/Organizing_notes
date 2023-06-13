import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import SquareIcon from "@mui/icons-material/Square";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default class EditCategoriesDialog extends Component {
  state = {
    editedCategory: null,
    isAddingInProgress: false,
  };

  setEditMode = (category) =>
    this.setState({ editedCategory: { ...category } });

  addCategoryApi = async (category) => {
    return await fetch(`http://localhost:3000/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
  };

  editCategoryApi = async (category) => {
    return await fetch(`http://localhost:3000/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
  };

  handleAddCategory = async () => {
    const newCategory = this.props.categories.find((c) => c.id === 0);
    const response = await this.addCategoryApi(newCategory);
    if (response.ok) {
      const savedCategory = await response.json();

      const updatedCategories = [...this.props.categories];
      updatedCategories.find((c) => c.id === 0).id = savedCategory.id;

      this.props.updateCategories(updatedCategories);

      this.setState({ editedCategory: null, isAddingInProgress: false });
    }
  };

  handleEditCategory = async (categoryId) => {
    const updatedCategory = this.props.categories.find(
      (c) => c.id === categoryId
    );

    const response = await this.editCategoryApi(updatedCategory);
    if (response.ok) {
      this.setState({ editedCategory: null, isAddingInProgress: false });
    }
  };

  handleSubmit = async (event, categoryId) => {
    event.preventDefault();

    if (this.state.isAddingInProgress) {
      this.handleAddCategory();
    } else {
      this.handleEditCategory(categoryId);
    }
  };

  handleDelete = async (categoryId) => {
    const response = await fetch(
      `http://localhost:3000/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const updatedCategories = this.props.categories.filter(
        (c) => c.id !== categoryId
      );

      this.props.updateCategories(updatedCategories);
    }
  };

  onCancel = () => {
    if (this.state.isAddingInProgress) {
      const filteredCategories = this.props.categories.filter(
        (el) => el.id !== 0
      );

      this.props.updateCategories(filteredCategories);
    } else if (this.state.editedCategory) {
      const updateCategories = [...this.props.categories];
      const index = updateCategories.findIndex(
        (el) => el.id === this.state.editedCategory.id
      );

      updateCategories[index] = this.state.editedCategory;

      this.props.updateCategories(updateCategories);
    }

    this.setState({ editedCategory: null, isAddingInProgress: false });
  };

  onClose = () => {
    this.onCancel();
    this.props.closeDialog();
  };

  render() {
    if (!this.props.showDialog) {
      return;
    }

    return (
      <Dialog
        fullWidth={true}
        open={this.props.showDialog}
        onClose={() => this.onClose()}
      >
        <DialogTitle>Edit Categories</DialogTitle>
        <DialogContent>
          <List>
            {this.props.categories.map((category) => (
              <ListItem
                disablePadding
                key={category.id}
                secondaryAction={
                  this.state.editedCategory &&
                  this.state.editedCategory.id === category.id ? (
                    <>
                      <IconButton
                        aria-label="save"
                        disabled={!category.name.trim() || !category.color}
                        onClick={(event) =>
                          this.handleSubmit(event, category.id)
                        }
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        aria-label="cancel"
                        onClick={() => this.onCancel()}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        aria-label="edit"
                        disabled={!!this.state.editedCategory}
                        onClick={() => this.setEditMode(category)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        disabled={!!this.state.editedCategory}
                        onClick={() => this.handleDelete(category.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
              >
                {this.state.editedCategory &&
                this.state.editedCategory.id === category.id ? (
                  <>
                    <Select
                      id={`category-color-${category.id}`}
                      aria-label="category color"
                      value={category.color}
                      variant="standard"
                      error={!category.color}
                      sx={{ mr: 2 }}
                      onChange={(event) => {
                        const updatedCategories = [...this.props.categories];
                        updatedCategories.find(
                          (el) => el.id === category.id
                        ).color = event.target.value;

                        this.props.updateCategories(updatedCategories);
                      }}
                    >
                      <MenuItem value={"#ffebee"}>
                        <SquareIcon sx={{ color: "#ffcdd2" }} />
                      </MenuItem>
                      <MenuItem value={"#e3f2fd"}>
                        <SquareIcon sx={{ color: "#bbdefb" }} />
                      </MenuItem>
                      <MenuItem value={"#fff3e0"}>
                        <SquareIcon sx={{ color: "#ffe0b2" }} />
                      </MenuItem>
                      <MenuItem value={"#fffde7"}>
                        <SquareIcon sx={{ color: "#fff9c4" }} />
                      </MenuItem>
                      <MenuItem value={"#e8f5e9"}>
                        <SquareIcon sx={{ color: "#c8e6c9" }} />
                      </MenuItem>
                      <MenuItem value={"#f3e5f5"}>
                        <SquareIcon sx={{ color: "#e1bee7" }} />
                      </MenuItem>
                    </Select>
                    <TextField
                      id={`category-name-${category.id}`}
                      aria-label="category name"
                      variant="standard"
                      fullWidth
                      value={category.name}
                      error={!category.name.trim()}
                      placeholder={
                        !category.name.trim() ? "Category name is required" : ""
                      }
                      onChange={(event) => {
                        const updatedCategories = [...this.props.categories];
                        updatedCategories.find(
                          (el) => el.id === category.id
                        ).name = event.target.value;

                        this.props.updateCategories(updatedCategories);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <SquareIcon sx={{ color: category.color, mr: 2 }} />
                    <ListItemText primary={category.name} />
                  </>
                )}
              </ListItem>
            ))}
            <ListItem
              disablePadding
              key="add-category"
              sx={{ justifyContent: "center" }}
            >
              <Button
                size="small"
                startIcon={<AddIcon />}
                disabled={!!this.state.editedCategory}
                onClick={() => {
                  const emptyCategory = {
                    id: 0,
                    name: "",
                    color: "",
                  };

                  const updatedCategories = [
                    ...this.props.categories,
                    emptyCategory,
                  ];

                  this.setEditMode(emptyCategory);
                  this.setState({ isAddingInProgress: true });

                  this.props.updateCategories(updatedCategories);
                }}
              >
                Add Category
              </Button>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.onClose()} aria-label="cancel">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
