import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Footer from 'src/components/Footer';
import axios from 'axios';
import EditProker from '../Edit';
import TambahKegiatan from './TambahKegiatan';

import { Container, Grid, Box, Typography, Skeleton } from '@mui/material';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ListKegiatan from './ListKegiatan';

function DetailsProgramKerja() {
  const [isLoading, setIsLoading] = useState(false);
  const [prokers, setProkers] = useState([]);
  const location = useLocation();
  const { id } = location.state;

  const reload = () => {
    setIsLoading(true);
    axios
      .get(`https://kkn-umm.vercel.app/proker/details/${id}`, {
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3MWZiZjcxZjE1MTNmNWNiMjdkNjViIiwibmltIjoiMDQxIiwiaWF0IjoxNjY4NDE1ODg0LCJleHAiOjE2Njg1MDIyODR9.oaaZZLzxqX9lZ9e7BlP5n8pbKhHgAp6WpNOmCFHg5Ps'
        }
      })
      .then((response) => {
        setProkers(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      axios
        .get(`https://kkn-umm.vercel.app/proker/details/${id}`, {
          headers: {
            'x-access-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3MWZiZjcxZjE1MTNmNWNiMjdkNjViIiwibmltIjoiMDQxIiwiaWF0IjoxNjY4NDE1ODg0LCJleHAiOjE2Njg1MDIyODR9.oaaZZLzxqX9lZ9e7BlP5n8pbKhHgAp6WpNOmCFHg5Ps'
          }
        })
        .then((response) => {
          setProkers(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Program Kerja - Details</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              {isLoading ? (
                <Skeleton animation="wave" width={180} />
              ) : (
                'Details Program Kerja'
              )}
            </Typography>
          </Grid>
          <Grid item>
            <EditProker data={prokers} reload={reload} isLoading={isLoading} />
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
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
                      {isLoading ? <Skeleton /> : `${prokers.title}`}
                    </Typography>
                    <Typography variant="subtitle2">
                      {isLoading ? <Skeleton /> : `${prokers.deskripsi}`}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} justifyContent="end" textAlign={'end'}>
                  <TambahKegiatan
                    reload={reload}
                    idProker={id}
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ListKegiatan
                data={prokers}
                id-proker={id}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        ) : (
          <Typography>Not found</Typography>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default DetailsProgramKerja;
