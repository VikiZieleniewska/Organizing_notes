import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import "./BasicAppBar.scss";

function BasicAppBar() {
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
          <Button color="inherit" variant="outlined" startIcon={<AddIcon />}>
            add note
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default BasicAppBar;
