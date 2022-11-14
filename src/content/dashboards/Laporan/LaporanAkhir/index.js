import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Alert,
  AlertTitle,
  Box,
  Button
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function LaporanAkhir() {
  const formData = new FormData();
  const [files, setFiles] = useState([]);
  //   const [status, setStatus] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/*': ['.pdf']
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    multiple: false
  });

  // formData.append('file', files);
  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i]);
  }
  formData.append('no_kelompok', '172');
  let id = '631306ca6063de54ff07ff73';
  const submitLaporan = () => {
    // for (const pair of formData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }

    axios
      .post(`http://localhost:8080/laporan/${id}`, formData)
      .then((response) => {
        console.log('data', response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getLaporan = () => {
  //     axios.get(`http://localhost:8080/laporan/${id}`).then((response) => {
  //         if (response.data.laporan != NULL) {
  //             setStatus(true);
  //         }
  //     });
  // };

  const thumbs = files.map((file) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'inline-flex',
          borderRadius: 2,
          border: '1px solid #eaeaea',
          marginBottom: 8,
          marginRight: 8,
          width: 100,
          height: 100,
          padding: 4,
          boxSizing: 'border-box'
        }}
        key={file.name}
      >
        <div
          style={{
            display: 'flex',
            minWidth: 0,
            overflow: 'hidden'
          }}
        >
          <img
            src="/static/images/overview/pdf-icons.png"
            style={{
              display: 'block',
              width: 'auto',
              height: '100%'
            }}
            alt=""
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'inline-flex',
          minWidth: 0,
          overflow: 'hidden'
        }}
      >
        <h6>{file.name}</h6>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
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
              Laporan Akhir
            </Typography>
            <Typography variant="subtitle2">Upload laporan akhir</Typography>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <Typography variant="h3" component="h3" gutterBottom>
                Laporan akhir
              </Typography>
              <Divider />
              <Alert severity="warning">
                <AlertTitle>
                  File Dokumen harus berekstensi <strong>*.pdf</strong>
                </AlertTitle>
                Contoh nama file{' '}
                <strong>Laporan_Akhir_KKN_KELOMPOK_1.pdf</strong>
              </Alert>
              {/* {status ? ( */}
              <Alert severity="success">
                <AlertTitle>
                  STATUS :<strong>Telah Disubmit</strong>
                </AlertTitle>
                jika ada revisi, upload ulang file dokumen yang telah direvisi
              </Alert>
              {/* ) : ( */}
              <Alert severity="success">
                <AlertTitle>
                  STATUS :<strong>Telah Disubmit</strong>
                </AlertTitle>
                jika ada revisi, upload ulang file dokumen yang telah direvisi
              </Alert>
              {/* )} */}
              <Box
                {...getRootProps({ className: 'dropzone' })}
                sx={{
                  border: '1px solid #efefef',
                  width: '100%',
                  height: '200px',
                  alignContent: 'center'
                }}
              >
                {/* <input {...getInputProps()} /> */}
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </Box>
              <Box>{thumbs}</Box>
              <Divider />
              <Button variant="contained" onClick={submitLaporan}>
                Save
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default LaporanAkhir;
