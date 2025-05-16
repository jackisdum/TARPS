import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ExportImport: React.FC = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">Export / Import</Typography>
      <Typography variant="body2" color="text.secondary">
        This will provide buttons to export and import progress as a JSON file. (Placeholder)
      </Typography>
    </CardContent>
  </Card>
);

export default ExportImport; 