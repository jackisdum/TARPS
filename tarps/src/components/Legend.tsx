import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Stack, TextField, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface State {
  label: string;
  color: string;
}

interface LegendProps {
  states: State[];
  selectedState: number;
  onSelectState: (idx: number) => void;
  onAddState: (newState: { label: string; color: string }) => void;
  onRemoveState: (idx: number) => void;
}

const Legend: React.FC<LegendProps> = ({ states, selectedState, onSelectState, onAddState, onRemoveState }) => {
  const [newLabel, setNewLabel] = useState('');
  const [newColor, setNewColor] = useState('#90caf9');

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    onAddState({ label: newLabel.trim(), color: newColor });
    setNewLabel('');
    setNewColor('#90caf9');
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Legend</Typography>
        <Stack direction="column" spacing={1}>
          {states.map((state, idx) => (
            <Box key={state.label} display="flex" alignItems="center">
              <Button
                variant={selectedState === idx ? 'contained' : 'outlined'}
                onClick={() => onSelectState(idx)}
                sx={{
                  backgroundColor: state.color,
                  color: '#222',
                  borderColor: state.color,
                  fontWeight: selectedState === idx ? 'bold' : 'normal',
                  boxShadow: selectedState === idx ? 2 : 0,
                  flex: 1,
                  '&:hover': {
                    backgroundColor: state.color,
                    opacity: 0.85,
                  },
                }}
                fullWidth
              >
                {state.label}
              </Button>
              {idx !== 0 && (
                <IconButton aria-label="delete" onClick={() => onRemoveState(idx)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
        </Stack>
        <Box mt={2} display="flex" gap={1} alignItems="center">
          <TextField
            size="small"
            label="Label"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            variant="outlined"
            sx={{ flex: 2 }}
          />
          <input
            type="color"
            value={newColor}
            onChange={e => setNewColor(e.target.value)}
            style={{ width: 40, height: 40, border: 'none', background: 'none', padding: 0 }}
          />
          <Button variant="contained" onClick={handleAdd} sx={{ height: 40 }}>
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Legend; 