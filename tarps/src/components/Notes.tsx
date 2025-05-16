import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Notes: React.FC = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">Daily Notes</Typography>
      <Typography variant="body2" color="text.secondary">
        This will allow entering daily highlight and lowlight notes. (Placeholder)
      </Typography>
    </CardContent>
  </Card>
);

export default Notes; 