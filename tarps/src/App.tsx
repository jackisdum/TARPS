import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import GridBoard from './components/GridBoard';
import Legend from './components/Legend';
import Notes from './components/Notes';
import ExportImport from './components/ExportImport';

const STATES = [
  { label: 'Empty', color: '#fff' },
  { label: 'Sleep', color: '#b39ddb' },
  { label: 'Wasted', color: '#ef9a9a' },
  { label: 'Productive', color: '#a5d6a7' },
  { label: 'Unavoidable', color: '#90caf9' },
];

function App() {
  const [selectedState, setSelectedState] = useState(1); // default to 'Sleep'

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TARPS
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <GridBoard
              states={STATES}
              selectedState={selectedState}
            />
            <Notes />
            <ExportImport />
          </Grid>
          <Grid item xs={12} md={4}>
            <Legend
              states={STATES}
              selectedState={selectedState}
              onSelectState={setSelectedState}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;