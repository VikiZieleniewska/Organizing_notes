import React, { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import CategoryFilter from "../CategoryFilter/CategoryFilter";
import ImportanceFilter from "../ImportanceFilter/ImportanceFilter";
import StatusFilter from "../StatusFilter/StatusFilter";

import "./NoteSearch.scss";

export default class NoteSearch extends Component {
  state = {
    showFilters: false,
  };

  toggleShowFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  handleSearch = (searchText) => {
    this.props.onSearch({ ...this.props.search, searchText: searchText });
  };

  render() {
    const { search, onSearch, categories, addingInProgress } = this.props;

    return (
      <AppBar position="static" className="filter-bar">
        <Container maxWidth="xl">
          <Toolbar
            className="toolbar"
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                className="search-input"
                placeholder="Search…"
                sx={{
                  margin: { xs: "4px 8px", md: "0" },
                }}
                value={search.searchText}
                size="small"
                disabled={addingInProgress}
                onChange={(event) => this.handleSearch(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="open filters"
                sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
                onClick={this.toggleShowFilters}
              >
                {this.state.showFilters ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
            </Box>

            <CategoryFilter
              search={search}
              onSearch={onSearch}
              categories={categories}
              addingInProgress={addingInProgress}
              showFilters={this.state.showFilters}
            />
            <ImportanceFilter
              search={search}
              onSearch={onSearch}
              addingInProgress={addingInProgress}
              showFilters={this.state.showFilters}
            />
            <StatusFilter
              search={search}
              onSearch={onSearch}
              addingInProgress={addingInProgress}
              showFilters={this.state.showFilters}
            />
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
