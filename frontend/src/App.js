import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './components/MainComponent'


import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <CssBaseline />
          <Main />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
