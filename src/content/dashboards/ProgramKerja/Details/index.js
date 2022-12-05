import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Footer from 'src/components/Footer';
import axios from 'axios';
import EditProker from '../Edit';
import TambahKegiatan from './TambahKegiatan';
import LoaderComponent from 'src/components/Loader';

import { Container, Grid, Box, Typography } from '@mui/material';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ListKegiatan from './ListKegiatan';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '500px',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 2
// };

function DetailsProgramKerja() {
  const [loader, setLoader] = useState(false);
  const [prokers, setProkers] = useState([]);
  //   const [open, setOpen] = useState(false);
  //   const [loadingButton, setLoadingButton] = useState(false);

  //   const { id } = useParams();
  //   console.log(location.state);
  const location = useLocation();
  const { id } = location.state;

  const reload = () => {
    console.log('reload page parent');
    setLoader(true);
    axios
      .get(`https://kkn-umm.vercel.app/proker/details/${id}`, {
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3MWZiZjcxZjE1MTNmNWNiMjdkNjViIiwibmltIjoiMDQxIiwiaWF0IjoxNjY4NDE1ODg0LCJleHAiOjE2Njg1MDIyODR9.oaaZZLzxqX9lZ9e7BlP5n8pbKhHgAp6WpNOmCFHg5Ps'
        }
      })
      .then((response) => {
        console.log('data', response.data.data);
        setProkers(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    const getData = () => {
      setLoader(true);
      axios
        .get(`https://kkn-umm.vercel.app/proker/details/${id}`, {
          headers: {
            'x-access-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3MWZiZjcxZjE1MTNmNWNiMjdkNjViIiwibmltIjoiMDQxIiwiaWF0IjoxNjY4NDE1ODg0LCJleHAiOjE2Njg1MDIyODR9.oaaZZLzxqX9lZ9e7BlP5n8pbKhHgAp6WpNOmCFHg5Ps'
          }
        })
        .then((response) => {
          console.log(response.data.data);
          setProkers(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoader(false);
        });
    };

    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Details Program Kerja
            </Typography>
          </Grid>
          <Grid item>
            <EditProker data={prokers} reload={reload} />
            {/* <Link to="/program-kerja/create"> */}
            {/* <Button
                            sx={{ mt: { xs: 2, md: 0 } }}
                            variant="contained"
                            startIcon={<AddTwoToneIcon fontSize="small" />}
                            onClick={handleOpen}
                        >
                            Kegiatan
                        </Button> */}
            {/* <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Card sx={style}>
                                <CardHeader
                                    id="modal-modal-title"
                                    title="Tambah Program Kerja"
                                />
                                <CardContent id="modal-modal-description">
                                    <FormGroup sx={{ gap: '16px' }}>
                                        <TextField
                                            name="title"
                                            id="outlined-basic"
                                            label="Judul"
                                            variant="outlined"
                                        />
                                        <TextField
                                            name="deskripsi"
                                            id="outlined-basic"
                                            label="Deskripsi"
                                            rows={3}
                                            variant="outlined"
                                            multiline
                                            sx={{ marginBottom: '8px' }}
                                        />
                                        <Divider sx={{ marginBottom: '8px' }} />
                                    </FormGroup>
                                </CardContent>
                                <CardActions>
                                    <LoadingButton
                                        variant="contained"
                                        loadingPosition="center"
                                        loading={loadingButton}
                                    >
                                        Simpan
                                    </LoadingButton>
                                    <Button variant="text">Batal</Button>
                                </CardActions>
                            </Card>
                        </Modal> */}
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        {!loader ? (
          <>
            {prokers ? (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12}>
                  <Grid container direction="row">
                    <Grid item xs={8}>
                      <Box>
                        <Typography variant="h3" component="h3" gutterBottom>
                          {prokers.title}
                        </Typography>
                        <Typography variant="subtitle2">
                          {prokers.deskripsi}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4} justifyContent="end" textAlign={'end'}>
                      <TambahKegiatan reload={reload} idProker={id} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <ListKegiatan data={prokers} id-proker={id} />
                </Grid>
              </Grid>
            ) : (
              <Typography>asdasdasdad</Typography>
            )}
          </>
        ) : (
          <LoaderComponent />
        )}
      </Container>
      <Footer />
    </>
  );
}

export default DetailsProgramKerja;
