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
  Box
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

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

function TambahKegiatan({ reload, idProker }) {
  const formData = new FormData();
  const [isOpen, setIsOpen] = useState(false);
  const [judul, setJudul] = useState();
  const [tanggal, setTanggal] = useState();
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
  formData.append('tanggal_kegiatan', tanggal);
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

  // const idProker = '6315c47d715ebda127766962';

  const saveData = () => {
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    axios
      .post(`https://vast-sands-85280.herokuapp.com/kegiatan/${idProker}`, formData)
      .then((response) => {
        console.log('data', response);
        setIsOpen(false);
        reload();
      })
      .catch((error) => {
        console.log(error);
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
      <Button variant="contained" startIcon={<EditIcon />} onClick={handleOpen}>
        Tambah Kegiatan
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
                name="title"
                id="outlined-basic"
                label="Judul Kegiatan"
                variant="outlined"
                onChange={(e) => setJudul(e.target.value)}
              />
              <TextField
                name="divisi"
                id="outlined-basic"
                label="Tanggal Kegiatan"
                variant="outlined"
                onChange={(e) => setTanggal(e.target.value)}
              />
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
