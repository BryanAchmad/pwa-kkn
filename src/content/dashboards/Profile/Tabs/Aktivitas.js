import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const Aktivitas = () => {
  return (
    <Card elevation={0}>
      <CardContent>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper'
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemText primary="Tidak ada aktivitas" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Aktivitas;
