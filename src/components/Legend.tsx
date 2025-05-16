import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

interface State {
  label: string;
  color: string;
}

interface LegendProps {
  states: State[];
  selectedState: number;
  onSelectState: (idx: number) => void;
}

const Legend: React.FC<LegendProps> = ({ states, selectedState, onSelectState }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>Legend</Typography>
      <Stack direction="column" spacing={1}>
        {states.map((state, idx) => (
          <Button
            key={state.label}
            variant={selectedState === idx ? 'contained' : 'outlined'}
            onClick={() => onSelectState(idx)}
            sx={{
              backgroundColor: state.color,
              color: '#222',
              borderColor: state.color,
              fontWeight: selectedState === idx ? 'bold' : 'normal',
              boxShadow: selectedState === idx ? 2 : 0,
              '&:hover': {
                backgroundColor: state.color,
                opacity: 0.85,
              },
            }}
            fullWidth
          >
            {state.label}
          </Button>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

export default Legend; 