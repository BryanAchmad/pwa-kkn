import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LoadingButton } from '@mui/lab';
// import axios from 'axios';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Typography from '@mui/material/Typography';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Tab,
  Tabs,
  Button,
  Modal,
  FormGroup,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  styled,
  CardActions,
  Skeleton
} from '@mui/material';

import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
// import LoaderComponent from 'src/components/Loader';

import KesehatanTab from './Divisi/KesehatanTab';
import EkonomiTab from './Divisi/EkonomiTab';
import PendidikanTab from './Divisi/PendidikanTab';
import PddTab from './Divisi/PddTab';
import KebudayaanTab from './Divisi/KebudayaanTab';
import LainlainTab from './Divisi/LainTab';
import { useAPI } from 'src/contexts/ApiContext';
import { createProkerReq } from 'src/api/proker';
// import LoaderComponent from 'src/components/Loader';
// import { useParams } from 'react-router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
};
const TabsWrapper = styled(Tabs)(
  () => `
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }
  `
);

function ProgramKerja() {
  // const param = useParams();
  const { divisi, prokers, isLoading, addNewData } = useAPI();
  console.log('prokers from useApi', prokers);

  // console.log('prokers', prokers.data.proker);

  // const programKerja = prokers.data.proker;
  // const proker = data[0];
  // const dProker = prokers.data.proker;
  // const [programKerja, setProgramKerja] = useState(prokers);

  // const { data: divisi } = data[1];
  // console.log('data => ', data);
  // const [spinner, setSpinner] = useState(false);
  // const [token, setToken] = useState();
  // const [divisi, setDivisi] = useState([]);
  // const [proker, setProker] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [currentTab, setCurrentTab] = useState('Divisi Ekonomi');
  const [dataProker, setDataProker] = useState({
    title: '',
    divisi: '',
    deskripsi: ''
  });
  const [loadingButton, setLoadingButton] = useState(false);
  // let id = localStorage.getItem('idKelompok');
  let id = '63734f0c41bfdb7ca8fbe819';

  const onClick = () => {
    setLoadingButton(false);
    saveProker();
  };
  
  const saveProker = async () => {
    setLoadingButton(true);
    setEnableButton(true);
    // const id = '63734f0c41bfdb7ca8fbe819';
    try {
      const send = await createProkerReq(id, dataProker);
      console.log(send);
      addNewData();
    } catch (e) {
      console.log(e);
      setLoadingButton(false);
      setEnableButton(false);
    } finally {
      setOpen(false);
    }
  };

  const handleChangeProker = (event) => {
    setDataProker({
      ...dataProker,
      [event.target.name]: event.target.value
    });
    // console.log(dataProker);
  };

  const handleOpen = () => {
    setOpen(true);
    // getDivisi();
  };
  const handleClose = () => setOpen(false);

  const tabs = [
    {
      value: 'Divisi Kesehatan & Lingkungan',
      label: 'Divisi Kesehatan & Lingkungan'
    },
    { value: 'Divisi Ekonomi', label: 'Divisi Ekonomi' },
    {
      value: 'Divisi Pendidikan & keagamaan',
      label: 'Divisi Pendidikan & keagamaan'
    },
    { value: 'Divisi Sosial & Budaya', label: 'Divisi Sosial & Budaya' },
    { value: 'Divisi HUMAS & PDD', label: 'Divisi HUMAS & PDD' },
    { value: 'Divisi Lain-lain', label: 'Divisi Lain-lain' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  // const TabMenu = [...new Set(prokers.map((divisi) => divisi.divisi))];

  const kesehatan = prokers?.data?.proker.filter(
    (prokers) => prokers.divisi === 'Divisi Kesehatan & Lingkungan'
  );
  const ekonomi = prokers?.data?.proker.filter(
    (prokers) => prokers.divisi === 'Divisi Ekonomi'
  );
  const pendidikan = prokers?.data?.proker.filter(
    (prokers) => prokers.divisi === 'Divisi Pendidikan & keagamaan'
  );
  const pdd = prokers?.data?.proker.filter(
    (prokers) => prokers.divisi === 'Divisi HUMAS & PDD'
  );
  const kebudayaan = prokers?.data?.proker.filter(
    (prokers) => prokers.divisi === 'Divisi Sosial & Budaya'
  );
  const lainlain = prokers?.data?.proker.filter(
    (prokers) => prokers.divisi === 'Divisi Lain-lain'
  );

  console.log('pendidikan', pendidikan);

  return (
    <>
      <Helmet>
        <title>SIMKKN - Program Kerja</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              {isLoading ? (
                <Skeleton animation="wave" width={150} />
              ) : (
                'Program Kerja'
              )}
            </Typography>
            <Typography variant="subtitle2">
              {isLoading ? <Skeleton animation="wave" /> : 'List Program Kerja'}
            </Typography>
          </Grid>
          <Grid item>
            {/* <Link to="/program-kerja/create"> */}
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={
                isLoading ? (
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={12}
                    height={12}
                  />
                ) : (
                  <AddTwoToneIcon fontSize="small" />
                )
              }
              onClick={handleOpen}
              disabled={isLoading}
            >
              {isLoading ? (
                <Skeleton animation="wave" width={100} height={40} />
              ) : (
                'Program Kerja'
              )}
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {/* <Box sx={style}> */}
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
                      onChange={handleChangeProker}
                    />
                    <FormControl fullwidth={+true}>
                      <InputLabel id="demo-simple-select-label">
                        Divisi
                      </InputLabel>
                      <Select
                        onChange={handleChangeProker}
                        labelId="demo-simple-select-label"
                        label="Divisi"
                        name="divisi"
                        defaultValue=""
                      >
                        {divisi &&
                          divisi.data.data.map((div, i) => (
                            <MenuItem
                              key={i}
                              value={div.nama}
                            >{`${div.deskripsi}`}</MenuItem>
                          ))}
                        {/* 
                        <MenuItem value={'test4'}>Twenty</MenuItem>
                        <MenuItem value={'30'}>Thirty</MenuItem> */}
                      </Select>
                    </FormControl>
                    <TextField
                      name="deskripsi"
                      id="outlined-basic"
                      label="Deskripsi"
                      rows={3}
                      variant="outlined"
                      multiline
                      sx={{ marginBottom: '8px' }}
                      onChange={handleChangeProker}
                    />
                    <Divider sx={{ marginBottom: '8px' }} />
                  </FormGroup>
                  {/* <ChildModal open={childModal}/> */}
                </CardContent>
                <CardActions>
                  <LoadingButton
                    variant="contained"
                    loadingPosition="center"
                    loading={loadingButton}
                    onClick={onClick}
                  >
                    Simpan
                  </LoadingButton>
                  <Button variant="text" disabled={enableButton}>
                    Batal
                  </Button>
                </CardActions>
              </Card>
              {/* </Box> */}
            </Modal>

            {/* </Link> */}
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          rowSpacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            {isLoading ? (
              <Skeleton animation="wave" height={80} sx={{ padding: 0 }} />
            ) : (
              <>
                <TabsWrapper
                  onChange={handleTabsChange}
                  value={currentTab}
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {/* {divisi.map((div) => {
                return (
                  <Tab key={div._id} label={div.nama} value={div.deskripsi} />
                  );
                })} */}
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </TabsWrapper>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <>
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  height={400}
                  sx={{ marginTop: -10 }}
                />
              ) : (
                <>
                  {currentTab === 'Divisi Pendidikan & Keagamaan' && (
                    <PendidikanTab data={pendidikan} />
                  )}
                  {currentTab === 'Divisi Sosial & Budaya' && (
                    <KebudayaanTab data={kebudayaan} />
                  )}
                  {currentTab === 'Divisi Kesehatan & Lingkungan' && (
                    <KesehatanTab data={kesehatan} />
                  )}
                  {currentTab === 'Divisi Ekonomi' && (
                    <EkonomiTab data={ekonomi} />
                  )}
                  {currentTab === 'Divisi HUMAS & PDD' && <PddTab data={pdd} />}
                  {currentTab === 'Divisi Lain-lain' && (
                    <LainlainTab data={lainlain} />
                  )}
                </>
              )}
            </>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ProgramKerja;
