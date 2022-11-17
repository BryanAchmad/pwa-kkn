import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
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
  CardActions
} from '@mui/material';

import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import KesehatanTab from './Divisi/KesehatanTab';
import EkonomiTab from './Divisi/EkonomiTab';

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
  // const [token, setToken] = useState();
  const [prokers, setProkers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [currentTab, setCurrentTab] = useState('ekonomi');
  const [dataProker, setDataProker] = useState({
    title: '',
    divisi: '',
    deskripsi: ''
  });
  const [loadingButton, setLoadingButton] = useState(false);
  // let id = localStorage.getItem('idKelompok');
  let id = '63734f0c41bfdb7ca8fbe819';

  const onClick = () => {
    setLoadingButton(true);
    sendData();
  };

  const sendData = () => {
    setEnableButton(true);
    axios
      .post(`http://127.0.0.1:8080/proker/${id}`, dataProker)
      .then((response) => {
        console.log(response);
        setEnableButton(false);
        setLoadingButton(false);
        getDataProker();
        setOpen(false);
      })
      .catch((e) => {
        console.log(e);
        setLoadingButton(false);
        setEnableButton(false);
      });
  };

  const handleChangeProker = (event) => {
    setDataProker({
      ...dataProker,
      [event.target.name]: event.target.value
    });
    // console.log(dataProker);
  };

  // const getToken = () => {

  // };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getDataProker = () => {
    axios
      .get(`https://vast-sands-85280.herokuapp.com/proker/${id}`, {
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3MzRmMzU0MWJmZGI3Y2E4ZmJlODFlIiwibmltIjoiMDQxIiwiaWF0IjoxNjY4NTg2NDQ2LCJleHAiOjE2Njg2NzI4NDZ9.WTPLTg-ODro1Yv75-CyD8pbY0WTb3fGGqo2ao0f5cms'
        }
      })
      .then((response) => {
        console.log('from client', new Date());
        console.log(response);
        setProkers(response.data.proker);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // const tokenAccess = sessionStorage.getItem('access_token');
    // setToken(tokenAccess);
    getDataProker();
  }, [prokers]);

  const tabs = [
    { value: 'ekonomi', label: 'Ekonomi' },
    { value: 'kesehatan', label: 'Kesehatan' },
    { value: 'sosial_budaya', label: 'Sosial & Budaya' },
    { value: 'pendidikan_agama', label: 'Pendidikan & Keagamaan' },
    { value: 'humas', label: 'Humas' },
    { value: 'lain', label: 'Lain-lain' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  const kesehatan = prokers.filter((prokers) => prokers.divisi === 'test1');
  const ekonomi = prokers.filter((prokers) => prokers.divisi === 'test4');

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Program Kerja
            </Typography>
            <Typography variant="subtitle2">List Program Kerja</Typography>
          </Grid>
          <Grid item>
            {/* <Link to="/program-kerja/create"> */}
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={handleOpen}
            >
              Program Kerja
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
                    <FormControl fullwidth>
                      <InputLabel id="demo-simple-select-label">
                        Divisi
                      </InputLabel>
                      <Select
                        onChange={handleChangeProker}
                        labelId="demo-simple-select-label"
                        label="Divisi"
                        name="divisi"
                      >
                        <MenuItem value={'test1'}>Ten</MenuItem>
                        <MenuItem value={'test4'}>Twenty</MenuItem>
                        <MenuItem value={'30'}>Thirty</MenuItem>
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
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'kesehatan' && <KesehatanTab data={kesehatan} />}
            {currentTab === 'ekonomi' && <EkonomiTab data={ekonomi} />}
            {/* {{currentTab === 'notifications' && <NotificationsTab />}
                        {currentTab === 'security' && <SecurityTab />} */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ProgramKerja;
