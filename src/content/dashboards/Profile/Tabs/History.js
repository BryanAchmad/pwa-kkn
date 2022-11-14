import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider
} from '@mui/material';
import React, { Fragment } from 'react';

const History = () => {
  return (
    <Card elevation={0} sx={{ border: '1px solid #efefef' }}>
      <CardContent>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper'
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </>
              }
            />
          </ListItem>
          <Divider component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default History;
