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

const INITIAL_STATES = [
  { label: 'Empty', color: '#fff' },
  { label: 'Sleep', color: '#b39ddb' },
  { label: 'Wasted', color: '#ef9a9a' },
  { label: 'Productive', color: '#a5d6a7' },
  { label: 'Unavoidable', color: '#90caf9' },
];

function App() {
  const [states, setStates] = useState(INITIAL_STATES);
  const [selectedState, setSelectedState] = useState(1); // default to 'Sleep'
  const [gridKey, setGridKey] = useState(0); // to force grid reset if needed

  // Add a new state
  const handleAddState = (newState: { label: string; color: string }) => {
    setStates(prev => [...prev, newState]);
  };

  // Remove a state (except 'Empty')
  const handleRemoveState = (idx: number) => {
    if (idx === 0) return; // Don't remove 'Empty'
    setStates(prev => prev.filter((_, i) => i !== idx));
    // Force grid reset by changing key (for simplicity)
    setGridKey(k => k + 1);
    // If the selected state is removed, reset to 'Empty'
    if (selectedState === idx) setSelectedState(0);
    else if (selectedState > idx) setSelectedState(s => s - 1);
  };

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
              key={gridKey}
              states={states}
              selectedState={selectedState}
            />
            <Notes />
            <ExportImport />
          </Grid>
          <Grid item xs={12} md={4}>
            <Legend
              states={states}
              selectedState={selectedState}
              onSelectState={setSelectedState}
              onAddState={handleAddState}
              onRemoveState={handleRemoveState}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;