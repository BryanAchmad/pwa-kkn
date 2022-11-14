import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  TextField,
  Button
} from '@mui/material';
import React from 'react';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
// import { useDropzone } from 'react-dropzone';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headernama: 'ID', width: 10 },
  { field: 'link', headernama: 'Link Publikasi', width: 300 }
];

const rows = [
  {
    id: 1,
    link: 'Bryan Aulya Achmad Istighfara'
  },
  {
    id: 2,
    link: 'Bryan Aulya Achmad Istighfara'
  },
  {
    id: 3,
    link: 'Bryan Aulya Achmad Istighfara'
  }
];

function MediaPublikasi() {
  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Media Publikasi
            </Typography>
            <Typography variant="subtitle2">
              Jika ada publikasi berupa media
            </Typography>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card elevation={0} sx={{ padding: '16px' }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItem="stretch"
                spacing={2}
              >
                <Grid item xs={12}>
                  <Typography variant="h4">Tambah Media Publikasi</Typography>
                </Grid>
                <Grid item xs={12} xl={10}>
                  <TextField
                    name="link"
                    id="outlined-basic"
                    label="Link Publikasi"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} xl={2} alignItem="center">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    fullWidth
                    size="large"
                    sx={{
                      height: '100%'
                    }}
                  >
                    save
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card elevation={0}>
              <CardHeader title="List Publikasi" />
              <CardContent sx={{ height: '400px', width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={20}
                  rowsPerPageOptions={[5]}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MediaPublikasi;
