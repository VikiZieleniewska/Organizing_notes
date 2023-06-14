import React, { Component } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";

export default class ImportanceFilter extends Component {
  handleSearch = (importance) => {
    this.props.onSearch({ ...this.props.search, importance: importance });
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
          value={this.props.search.importance}
          onChange={(event) => this.handleSearch(event.target.value)}
        >
          <MenuItem value="">
            <ListItemText primary="Any Importance" />
          </MenuItem>
          <MenuItem value="Important">
            <ListItemText primary="Important" />
          </MenuItem>
          <MenuItem value="Not Important">
            <ListItemText primary="Not Important" />
          </MenuItem>
        </Select>
      </>
    );
  }
}
