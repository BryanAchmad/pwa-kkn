// import { OpenInBrowser } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormGroup,
  TextField,
  CardActions,
  Box,
  Skeleton,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
// import { useAPI } from 'src/contexts/ApiContext'
// import { useContext } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1000px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
};

function TambahKegiatan({ reload, idProker, isLoading }) {
  // const  {addNewData}= useAPI();
  const formData = new FormData();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [judul, setJudul] = useState();
  const [tanggalPicker, setTanggalPicker] = useState(dayjs());
  const [deskripsi, setDeskripsi] = useState();
  const [images, setImages] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles) => {
      setImages(
        acceptedFiles.map((image) =>
          Object.assign(image, {
            preview: URL.createObjectURL(image)
          })
        )
      );
    }
  });

  formData.append('judul_kegiatan', judul);
  formData.append('tanggal_kegiatan', new Date(tanggalPicker).toUTCString());
  formData.append('deskripsi', deskripsi);
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }
  // formData.append('images', JSON.stringify(images));

  const thumbs = images.map((image) => (
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
      key={image.name}
    >
      <div style={{ display: 'flex', minWidth: 0, overflow: 'hidden' }}>
        <img
          alt=""
          src={image.preview}
          style={{ display: 'block', width: 'auto', height: '100%' }}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(image.preview);
          }}
        />
      </div>
    </div>
  ));

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePicker = (newValue) => {
    setTanggalPicker(newValue);
  };

  // const idProker = '6315c47d715ebda127766962';

  const saveData = () => {
    setLoading(true);
    axios
      .post(`https://kkn-umm.vercel.app/kegiatan/${idProker}`, formData)
      .then((response) => {
        console.log('data', response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsOpen(false);
        
        reload();
      });
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
        console.log(image);
      });
  }, []);

  return (
    <>
      <Button
        variant="contained"
        startIcon={
          isLoading ? (
            <Skeleton
              variant="circular"
              animation="wave"
              height={16}
              width={16}
            />
          ) : (
            <EditIcon />
          )
        }
        onClick={handleOpen}
        disabled={isLoading}
      >
        {isLoading ? (
          <Typography variant="subtitle2">
            <Skeleton animation="wave" width={100} height={40} />
          </Typography>
        ) : (
          'Tambah Kegiatan'
        )}
      </Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardHeader id="modal-modal-title" title="Edit Program Kerja" />
          <CardContent id="modal-modal-description">
            <FormGroup sx={{ gap: '16px' }}>
              <TextField
                name="judul"
                id="outlined-basic"
                label="Judul Kegiatan"
                variant="outlined"
                onChange={(e) => setJudul(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <TextField
                  name="tanggal"
                  id="outlined-basic"
                  label="Tanggal Kegiatan"
                  variant="outlined"
                  onChange={(e) => setTanggal(e.target.value)}
                /> */}
                <DateTimePicker
                  label="Date&Time picker"
                  value={tanggalPicker}
                  onChange={handlePicker}
                  renderInput={(params) => (
                    <TextField
                      name="tanggal"
                      id="outlined-basic"
                      label="Tanggal Kegiatan"
                      variant="outlined"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                name="deskripsi"
                id="outlined-basic"
                label="Deskripsi"
                rows={3}
                variant="outlined"
                multiline
                sx={{ marginBottom: '8px' }}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
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

              <Divider sx={{ marginBottom: '8px' }} />
            </FormGroup>
          </CardContent>
          <CardActions>
            <LoadingButton
              variant="contained"
              loadingPosition="center"
              loading={loading}
              onClick={saveData}
            >
              Simpan
            </LoadingButton>
            <Button variant="text" onClick={handleClose}>
              Batal
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
}

export default TambahKegiatan;
