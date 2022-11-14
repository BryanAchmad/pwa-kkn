import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Alert,
  AlertTitle,
  Box
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import { useDropzone } from 'react-dropzone';

function ProfilDesa() {
  const [files, setFiles] = useState([]);
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

  const thumbs = files.map((file) => (
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
      <div style={{ display: 'flex', minWidth: 0, overflow: 'hidden' }}>
        <img
          src={file.preview}
          style={{ display: 'block', width: 'auto', height: '100%' }}
          alt=""
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
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
              Profil Desa
            </Typography>
            <Typography variant="subtitle2">Upload Profil Desa</Typography>
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
                Upload Profil Desa
              </Typography>
              <Divider />
              <Alert severity="warning">
                <AlertTitle>
                  File Dokumen harus berekstensi <strong>*.pdf</strong>
                </AlertTitle>
                Contoh nama file <strong>Profil_Desa_KKN_KELOMPOK_1.pdf</strong>
              </Alert>
              <Alert severity="success">
                <AlertTitle>
                  STATUS :<strong>Telah Disubmit</strong>
                </AlertTitle>
                jika ada revisi, upload ulang file dokumen yang telah direvisi
              </Alert>

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
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProfilDesa;
