import React, { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import "./NoteSearch.scss";

export default class NoteSearch extends Component {
  render() {
    const { search, onSearch } = this.props;

    return (
      <AppBar position="static" className="filter-bar">
        <Container maxWidth="xl">
          <Toolbar className="toolbar">
            <TextField
              className="search-input"
              placeholder="Search…"
              // variant="standard"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
