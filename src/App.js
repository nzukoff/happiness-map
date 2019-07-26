import React from 'react';
import Viz from './components/Viz/Viz'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: { fontFamily: "'Questrial', sans-serif", useNextVariants: true },
})

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Viz />
      </div>
    </MuiThemeProvider>
  );
}
