import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, Container, Grid } from '@mui/material';

const columns = [
  { field: 'id', headernama: 'ID', width: 90 },
  { field: 'nama', headernama: 'Nama', width: 300 },
  { field: 'fakultas', headernama: 'Fakultas', width: 250 },
  {
    field: 'jurusan',
    headernama: 'Jurusan',
    width: 250
  },
  {
    field: 'telp',
    headernama: 'No Telp',
    width: 200
  },
  {
    field: 'nilai',
    headernama: 'Nilai',
    width: 100
  }
];

const rows = [
  {
    id: 1,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 2,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 3,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 4,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 5,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 6,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 7,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 8,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 9,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 10,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 11,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 12,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 13,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 14,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 15,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 16,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 17,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 18,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 19,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 20,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 21,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 22,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 23,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 24,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 25,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 26,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 27,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 28,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 29,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  },
  {
    id: 30,
    nama: 'Bryan Aulya Achmad Istighfara',
    fakultas: 'Fakultas Teknik',
    jurusan: 'Teknik Informatika',
    telp: '081232620494',
    nilai: 'X'
  }
];

const Kelompok = () => {
  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Daftar Anggota Kelompok" />
              <CardContent sx={{ height: '800px', width: '100%' }}>
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
};

export default Kelompok;
