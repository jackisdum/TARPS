import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Legend: React.FC = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">Legend</Typography>
      <Typography variant="body2" color="text.secondary">
        This will display and manage color/state pairs. (Placeholder)
      </Typography>
    </CardContent>
  </Card>
);

export default Legend; 