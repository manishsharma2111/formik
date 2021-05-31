import React from "react";
import ControlledAccordions from "./form";
import {
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
  Typography,
  Grid,
} from "@material-ui/core";

const themes = createMuiTheme({
  pallette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#11cb5f",
      light: "#f8324526",
    },
    background: {
      default: "#f44336",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={themes}>
      <Grid container directon="column" justify="center" spacing={2}>
        <Grid item container justify="center">
          <Typography variant="h3" color="primary">
            Survey
          </Typography>
        </Grid>

        <Grid item>
          <ControlledAccordions />
        </Grid>
      </Grid>

      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
