import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import EditNoteIcon from "@mui/icons-material/EditNote";

import EditCategoriesDialog from "../EditCategoriesDialog/EditCategoriesDialog.jsx";

import "./BasicAppBar.scss";

export default class BasicAppBar extends Component {
  state = {
    menuAnchorEl: null,
    mobileMenuAnchorEl: null,
    showEditCategoriesDialog: false,
  };

  handleAddNote = () => {
    this.props.onAddNote();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMenuAnchorEl: event.currentTarget });
  };

  handleMenuOpen = (event) => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuAnchorEl: null });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMenuAnchorEl: null });
  };

  handleEditCategories = () => {
    this.handleMenuClose();
    this.handleMobileMenuClose();

    this.openCategoriesDialog();
  };

  openCategoriesDialog = () => {
    this.setState({ showEditCategoriesDialog: true });
  };

  closeCategoriesDialog = () => {
    this.setState({ showEditCategoriesDialog: false });
  };

  render() {
    const isMenuOpen = Boolean(this.state.menuAnchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMenuAnchorEl);

    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={this.state.menuAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleEditCategories}>
          <EditNoteIcon sx={{ mr: 2 }} />
          <p>Edit Categories</p>
        </MenuItem>
      </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMenuAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleAddNote}>
          <AddIcon sx={{ mr: 2 }} />
          <p>Add Note</p>
        </MenuItem>
        <MenuItem onClick={this.handleEditCategories}>
          <EditNoteIcon sx={{ mr: 2 }} />
          <p>Edit Categories</p>
        </MenuItem>
      </Menu>
    );

    return (
      <AppBar position="static" className="app-bar">
        <Container maxWidth="xl">
          <Toolbar className="toolbar">
            <Typography
              variant="h6"
              component="div"
              className="title"
              sx={{ flexGrow: 1 }}
            >
              Notes
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}
              onClick={this.handleAddNote}
            >
              add note
            </Button>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}
              onClick={this.handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open drawer"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={this.handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
        {renderMobileMenu}
        {renderMenu}
        <EditCategoriesDialog
          categories={this.props.categories}
          updateCategories={this.props.onUpdateCategories}
          showDialog={this.state.showEditCategoriesDialog}
          closeDialog={this.closeCategoriesDialog}
        />
      </AppBar>
    );
  }
}
