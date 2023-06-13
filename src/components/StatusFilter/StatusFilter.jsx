import React, { Component } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";

export default class StatusFilter extends Component {
  handleSearch = (status) => {
    this.props.onSearch({ ...this.props.search, status: status });
  };

  render() {
    return (
      <>
        <Select
          id="subheader"
          displayEmpty
          sx={{ ml: 2 }}
          size="small"
          disabled={this.props.addingInProgress}
          value={this.props.search.status}
          onChange={(event) => this.handleSearch(event.target.value)}
        >
          <MenuItem value="">
            <ListItemText primary="Any Status" />
          </MenuItem>
          <MenuItem value="Done">
            <ListItemText primary="Done" />
          </MenuItem>
          <MenuItem value="Not Done">
            <ListItemText primary="Not Done" />
          </MenuItem>
        </Select>
      </>
    );
  }
}
