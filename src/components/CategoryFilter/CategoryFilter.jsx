import React, { Component } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";

export default class CategoryFilter extends Component {
  handleSearch = (categoryId) => {
    this.props.onSearch({ ...this.props.search, selectedCategory: categoryId });
  };

  render() {
    return (
      <>
        <Select
          id="subheader"
          displayEmpty
          sx={{
            margin: { xs: "4px 8px", md: "4px 0 4px 16px" },
            display: {
              xs: this.props.showFilters ? "flex" : "none",
              md: "flex",
            },
          }}
          size="small"
          disabled={this.props.addingInProgress}
          value={this.props.search.selectedCategory}
          onChange={(event) => this.handleSearch(event.target.value)}
        >
          <MenuItem key="any-category" value="">
            <ListItemText primary="Any Category" />
          </MenuItem>
          {this.props.categories.map((c) => (
            <MenuItem key={`filter-${c.id}`} value={c.id}>
              <ListItemText primary={c.name} />
            </MenuItem>
          ))}
        </Select>
      </>
    );
  }
}
