import {
  Box,
  Card,
  CardHeader,
  Button,
  CardContent,
  Grid,
  Divider,
  Paper,
  List,
  ListItemIcon,
  ListItemText,
  ImageList,
  ImageListItem,
  Skeleton
} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CollectionsIcon from '@mui/icons-material/Collections';
// import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

function ListKegiatan({ data, isLoading }) {
  const { kegiatan } = data;
  console.log('data', kegiatan);
  const [dataKegiatan, setDataKegiatan] = useState(kegiatan);
  console.log('data kegiatan', dataKegiatan);

  useEffect(() => {
    setDataKegiatan(kegiatan);
  }, [data]);
  return (
    <>
      {isLoading ? (
        <Skeleton animation="wave" height={80} />
      ) : (
        <Box>
          <Card>
            <CardHeader
              titleTypographyProps={{ variant: 'h2' }}
              title="List Kegiatan"
            />
            <CardContent>
              <Box
                sx={{
                  width: '100%',
                  typography: 'body1',
                  boxShadow: 2
                }}
              >
                {dataKegiatan && dataKegiatan.length !== 0 ? (
                  dataKegiatan.map((kegiatan, index) => (
                    <Accordion
                      sx={{
                        border: '1px solid #444444'
                      }}
                      key={index}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        {/* <Divider /> */}
                        <Typography component="div">
                          <Box
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '16px',
                              m: 1
                            }}
                          >
                            {kegiatan.judul_kegiatan}
                          </Box>
                        </Typography>
                      </AccordionSummary>
                      <Divider />
                      <AccordionDetails>
                        <Grid
                          container
                          direction="row"
                          spacing={3}
                          sx={{ padding: '0 0 0 32px' }}
                        >
                          <Grid item lg={12}>
                            <Box>
                              <List
                                sx={{
                                  display: 'inline-flex'
                                }}
                              >
                                <ListItemIcon>
                                  <DescriptionIcon />
                                </ListItemIcon>
                                <ListItemText
                                  disableTypography
                                  primary={
                                    <Typography
                                      sx={{
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      Deskripsi
                                    </Typography>
                                  }
                                />
                              </List>
                              <Paper
                                elevation={0}
                                sx={{
                                  marginLeft: '68px'
                                }}
                              >
                                <Typography>{kegiatan.deskripsi}</Typography>
                              </Paper>
                              <Divider
                                variant="inset"
                                sx={{ marginY: '16px' }}
                              />
                              <List
                                sx={{
                                  display: 'inline-flex'
                                }}
                              >
                                <ListItemIcon>
                                  <CalendarMonthIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography
                                      sx={{
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      Tanggal Kegiatan
                                    </Typography>
                                  }
                                />
                              </List>
                              <Paper
                                elevation={0}
                                sx={{
                                  margin: '0 0 16px 68px'
                                }}
                              >
                                <Typography>
                                  {new Date(
                                    kegiatan.tanggal_kegiatan
                                  ).toLocaleString()}
                                </Typography>
                              </Paper>
                              <Divider
                                variant="inset"
                                sx={{ marginY: '16px' }}
                              />
                              <List
                                sx={{
                                  display: 'inline-flex'
                                }}
                              >
                                <ListItemIcon>
                                  <CollectionsIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography
                                      sx={{
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      Galeri
                                    </Typography>
                                  }
                                />
                              </List>
                              {kegiatan.images.length === 0 ? (
                                <Paper
                                  elevation={0}
                                  sx={{
                                    margin: '0 0 16px 68px'
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    Foto tidak ada
                                  </Typography>
                                </Paper>
                              ) : (
                                <Paper
                                  elevation={0}
                                  sx={{
                                    margin: '0 0 16px 68px'
                                  }}
                                >
                                  <ImageList
                                    variant="masonry"
                                    sx={{
                                      width: 'auto',
                                      height: 450
                                    }}
                                    cols={3}
                                  >
                                    {kegiatan.images.map((file, i) => (
                                      <ImageListItem key={i}>
                                        <img
                                          src={`https://kkn-umm.vercel.app/${file.filePath}`}
                                          alt={file.fileName}
                                          loading="lazy"
                                        />
                                      </ImageListItem>
                                    ))}
                                  </ImageList>
                                </Paper>
                              )}
                            </Box>
                          </Grid>
                          <Grid item lg={12}>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: '8px'
                              }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<EditOutlined />}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteOutline />}
                              >
                                Delete
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : (
                  <Typography>Not found</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}

export default ListKegiatan;
