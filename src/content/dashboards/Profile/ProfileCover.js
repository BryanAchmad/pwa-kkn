// import PropTypes from 'prop-types';
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
  ListItemText,
  Skeleton
} from '@mui/material';

import {
  Cake,
  Call,
  Lightbulb,
  PermIdentity,
  School
} from '@mui/icons-material';
import { useAPI } from 'src/contexts/ApiContext';

const ProfileCover = () => {
  const { user, isLoading } = useAPI();
  console.log('user', user);

  return (
    <>
      <Card>
        <CardActionArea disabled>
          {isLoading ? (
            <Skeleton
              sx={{ height: 250 }}
              animation="wave"
              variant="rectangular"
            />
          ) : (
            <CardMedia
              component="img"
              height="auto"
              image="/static/images/avatars/4.jpg"
              alt="green iguana"
              loading="lazy"
            />
          )}
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <Typography gutterBottom variant="h3">
              {isLoading ? (
                <Skeleton animation="wave" />
              ) : (
                `${user?.data?.data?.nama}`
              )}
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
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <PermIdentity />
                  )}
                </ListItemIcon>
                <ListItemText disableTypography>
                  {isLoading ? (
                    <>
                      <Typography variant="subtitle2">
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    `${user?.data?.data?.nim}`
                  )}
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <Call />
                  )}
                </ListItemIcon>
                <ListItemText disableTypography>
                  {isLoading ? (
                    <>
                      <Typography variant="subtitle2">
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    `${user?.data?.data?.nilai}`
                  )}
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <Cake />
                  )}
                </ListItemIcon>
                <ListItemText disableTypography>
                  {isLoading ? (
                    <>
                      <Typography variant="subtitle2">
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    `${user?.data?.data?.nim}`
                  )}
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <School />
                  )}
                </ListItemIcon>
                <ListItemText disableTypography>
                  {isLoading ? (
                    <>
                      <Typography variant="subtitle2">
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    `${user?.data?.data?.fakultas}`
                  )}
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <Lightbulb />
                  )}
                </ListItemIcon>
                <ListItemText disableTypography>
                  {isLoading ? (
                    <>
                      <Typography variant="subtitle2">
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    `${user?.data?.data?.jurusan}`
                  )}
                </ListItemText>
              </ListItem>
            </List>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

// ProfileCover.propTypes = {
//   // @ts-ignore
//   user: PropTypes.object.isRequired
// };

export default ProfileCover;
