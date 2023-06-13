import React, { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import CategoryFilter from "../CategoryFilter/CategoryFilter";

import "./NoteSearch.scss";

export default class NoteSearch extends Component {
  handleSearch = (searchText) => {
    this.props.onSearch({ ...this.props.search, searchText: searchText });
  };

  render() {
    const { search, onSearch, categories } = this.props;

    return (
      <AppBar position="static" className="filter-bar">
        <Container maxWidth="xl">
          <Toolbar className="toolbar">
            <TextField
              className="search-input"
              placeholder="Search…"
              value={search.searchText}
              size="small"
              onChange={(event) => this.handleSearch(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <CategoryFilter
              search={search}
              onSearch={onSearch}
              categories={categories}
            />
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
