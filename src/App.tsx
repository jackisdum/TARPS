import React from 'react';
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

function App() {
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
          <Grid size={{ xs: 12, md: 8 }}>
            <GridBoard />
            <Notes />
            <ExportImport />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Legend />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;