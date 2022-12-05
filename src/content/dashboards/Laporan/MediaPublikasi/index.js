import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  TextField,
  // Button,
  FormControlLabel,
  IconButton
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
// import { useDropzone } from 'react-dropzone';
import {
  Add as AddIcon,
  Link as LinkIcon,
  DeleteOutline as DeleteIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import LoaderComponent from 'src/components/Loader';
import { LoadingButton } from '@mui/lab';
// import { Link } from 'react-router-dom';

const columns = [
  {
    field: 'link',
    headerName: 'Link',
    width: 700
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    renderCell: (params) => new Date(params.value).toLocaleString()
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 140,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: 'pointer' }}
        >
          <DeleteMedia index={params} />
          <LinkComponent index={params} />
        </div>
      );
    }
  }
];

const DeleteMedia = ({ index }) => {
  const handleDeleteClick = () => {
    console.log(index);
  };

  return (
    <FormControlLabel
      control={
        <IconButton color="secondary" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      }
    />
  );
};

const LinkComponent = ({ index }) => {
  const handleLinkClick = () => {
    console.log(index);
  };

  return (
    <FormControlLabel
      control={
        <IconButton color="secondary" onClick={handleLinkClick}>
          <LinkIcon />
        </IconButton>
      }
    />
  );
};
// const rows = [
//   {
//     id: 1,
//     link: 'Bryan Aulya Achmad Istighfara'
//   },
//   {
//     id: 2,
//     link: 'Bryan Aulya Achmad Istighfara'
//   },
//   {
//     id: 3,
//     link: 'Bryan Aulya Achmad Istighfara'
//   }
// ];

function MediaPublikasi() {
  const [media, setMedia] = useState([]);
  const [data, setData] = useState();
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let kelompok = '10';
  const getMedia = () => {
    setSpinner(true);
    axios
      .get(`https://kkn-umm.vercel.app/media/${kelompok}`)
      .then((response) => {
        setMedia(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  let id = '63734f0c41bfdb7ca8fbe819';
  const saveMedia = () => {
    setLoading(true);
    axios
      .post(`https://kkn-umm.vercel.app/media/${id}`, {
        no_kelompok: kelompok,
        link: data
      })
      .then((response) => {
        console.log(response);
        getMedia();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getMedia();
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
                    error={error}
                    name="link"
                    id="outlined-basic"
                    label="Link Publikasi"
                    variant="outlined"
                    required="true"
                    onChange={(e) => {
                      if (e.target.value === '' || e.target.value === null) {
                        setError(error);
                      } else {
                        setData(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} xl={2} alignItem="center">
                  <LoadingButton
                    variant="contained"
                    loadingPosition="center"
                    fullWidth
                    size="large"
                    sx={{ height: '100%' }}
                    loading={loading}
                    onClick={saveMedia}
                    startIcon={<AddIcon />}
                  >
                    Simpan
                  </LoadingButton>
                  {/* <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    fullWidth
                    size="large"
                    sx={{
                      height: '100%'
                    }}
                  >
                    save
                  </Button> */}
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card elevation={0}>
              <CardHeader title="List Publikasi" />
              <CardContent sx={{ height: 'auto', width: '100%' }}>
                {!spinner ? (
                  <DataGrid
                    autoHeight
                    rows={media}
                    columns={columns}
                    getRowId={(rows) => rows._id}
                    pageSize={20}
                    rowsPerPageOptions={[5]}
                  />
                ) : (
                  <LoaderComponent />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MediaPublikasi;
