import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import {
  Cake,
  Call,
  Lightbulb,
  PermIdentity,
  School
} from '@mui/icons-material';

const ProfileCover = ({ user }) => {
  return (
    <>
      <Card>
        <CardActionArea disabled>
          <CardMedia
            component="img"
            height="auto"
            image="/static/images/avatars/4.jpg"
            alt="green iguana"
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <Typography gutterBottom variant="h3" component="div">
              {user.name}
            </Typography>
            <Divider />
            <List
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <ListItem disablePadding>
                <ListItemIcon>
                  <PermIdentity />
                </ListItemIcon>
                <ListItemText primary="201620370311041" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Call />
                </ListItemIcon>
                <ListItemText primary="081232620494" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Cake />
                </ListItemIcon>
                <ListItemText primary="Jombang, 08 Juni 1998" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Fakultas Teknik" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Lightbulb />
                </ListItemIcon>
                <ListItemText primary="Teknik Informatika" />
              </ListItem>
            </List>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
