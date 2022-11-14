// import { OpenInBrowser } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
    Modal,
    Button,
    Card,
    CardHeader,
    CardContent,
    Divider,
    FormGroup,
    TextField,
    CardActions
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

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

function EditProker({ data, reload }) {
    const [isOpen, setIsOpen] = useState(false);
    const [dataProker, setDataProker] = useState({
        title: data.title,
        deskripsi: data.deskripsi,
        divisi: data.divisi
    });

    useEffect(() => {
        setDataProker({
            title: data.title,
            deskripsi: data.deskripsi,
            divisi: data.divisi
        });
    }, [data]);
    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleEditProker = (event) => {
        setDataProker({
            ...dataProker,
            [event.target.name]: event.target.value
        });
    };

    const updateData = () => {
        axios
            .patch(`http://localhost:8080/proker/${data._id}`, dataProker)
            .then((response) => {
                console.log('update', response);
                setIsOpen(false);
                reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleOpen}
            >
                Edit
            </Button>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <CardHeader
                        id="modal-modal-title"
                        title="Edit Program Kerja"
                    />
                    <CardContent id="modal-modal-description">
                        <FormGroup sx={{ gap: '16px' }}>
                            <TextField
                                name="title"
                                id="outlined-basic"
                                label="Judul"
                                variant="outlined"
                                value={dataProker.title}
                                onChange={handleEditProker}
                            />
                            <TextField
                                name="divisi"
                                id="outlined-basic"
                                label="Divisi"
                                variant="outlined"
                                disabled
                                value={dataProker.divisi}
                                onChange={handleEditProker}
                            />
                            <Typography variant={'h6'} sx={{ color: 'red' }}>
                                Divisi cannot be edited
                            </Typography>
                            <TextField
                                name="deskripsi"
                                id="outlined-basic"
                                label="Deskripsi"
                                rows={3}
                                variant="outlined"
                                multiline
                                sx={{ marginBottom: '8px' }}
                                onChange={handleEditProker}
                                value={dataProker.deskripsi}
                            />
                            <Divider sx={{ marginBottom: '8px' }} />
                        </FormGroup>
                    </CardContent>
                    <CardActions>
                        <LoadingButton
                            variant="contained"
                            loadingPosition="center"
                            onClick={updateData}
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

export default EditProker;
