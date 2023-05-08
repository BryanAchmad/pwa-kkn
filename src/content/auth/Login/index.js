// import axios from 'src/api/axios';
import React, {  useState } from 'react';
import {
    Button,
    Container,
    Grid,
    Typography,
    TextField,
    Paper,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, Person, VisibilityOff, Pin } from '@mui/icons-material';
import {useAuthentication} from 'src/contexts/AuthContext';
import { useNavigate } from 'react-router';
// import {useAPI} from 'src/contexts/ApiContext'
// import { login } from 'src/api/auth';
// import { Navigate } from 'react-router';
// import { useApi } from 'src/contexts/ApiContext';
// import { login } from 'src/api/auth';
import axios from 'src/api/axios';
// import { useNavigate } from 'react-router-dom';

// const LOGIN_URL = '/login';

const index = () => {
    console.log('check page login');
    const { login } = useAuthentication();
    // const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    // const {addNewData} = useAPI();

    const [credentials, setCrendentials] = useState({
        nim: '',
        pic: '',
        showPass: ''
    });
    //   const [pic, setPic] = useState();

    //   const handleLogin = (event) => {
    //     setCrendentials({
    //       ...credentials,
    //       [event.target.name]: event.target.value
    //     });
    //     // console.log(dataProker);
    //   };

    const handleShowPassword = () => {
        setCrendentials({
            ...credentials,
            showPass: !credentials.showPass
        });
    };

    const handleSubmit = async (e) => {
        console.log(credentials);
        e.preventDefault();
        // const { handleLogin } = await login(credentials);
        try {
            const response = await axios.post('/login', credentials);
            console.log('response', response);
            if (response.status === 200) {
                await login(response.data);
                navigate('/', { replace: true });
            } else {
                console.log("login salah")
            }
            // const response = await login(credentials);
            // if(response.status === 200) {
            //     navigate('/', { replace: true });
            // }
            // navigate("/");
            // < to="/" replace={true} Navigate/>;
        } catch (error) {
            console.error('error', error);
        }
        // login(credentials)
        //     .then((response) => {
        //         console.log('success login', response);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
        // if (success) {
        //     return <Navigate to="/" replace />
        // navigate('/', { replace: true });
        // }
        // console.log(handleLogin);
        // console.log('login', response);
    };
    // const LoginUser = () => {
    //     console.log(credentials);
    //     axios.defaults.withCredentials = true;
    //     // const authContext = useContext(AuthContext);
    //     // const navigate = useNavigate();

    //     axios
    //     .post(LOGIN_URL, credentials, {
    //         headers: { 'content-type': 'application/json' },
    //         withCredentials: true
    //     })
    //     .then((response) => {
    //         console.log(response);
    //         const nim = response?.data?.nim;
    //         const nama = response?.data?.idMahasiswa?.nama;
    //         const kelompok = response?.data?.kelompok;
    //         const token = response?.data?.access_token;
    //         setAuth({ nim, nama, kelompok, token });
    //         // process.exit();
    //         // setToken(response.data?.data?.access_token);
    //     })
    //     .catch((e) => console.log(e));
    // };

    return (
        <Container maxWidth="sm">
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                sx={{
                    minHeight: '100vh'
                }}
            >
                <Paper elevation={2} sx={{ padding: 5 }}>
                    <form>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Typography variant="h4">
                                    Login dulu bestie
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="text"
                                    label="NIM"
                                    placeholder="20121313033913"
                                    variant="outlined"
                                    name="nim"
                                    onChange={(e) =>
                                        setCrendentials({
                                            ...credentials,
                                            nim: e.target.value
                                        })
                                    }
                                    required
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type={
                                        credentials.showPass
                                            ? 'text'
                                            : 'password'
                                    }
                                    fullWidth
                                    label="PIC"
                                    placeholder="********"
                                    variant="outlined"
                                    name="pic"
                                    required
                                    onChange={(e) =>
                                        setCrendentials({
                                            ...credentials,
                                            pic: e.target.value
                                        })
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleShowPassword}
                                                    aria-label="Toggle password"
                                                    edge="end"
                                                >
                                                    {credentials.showPass ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Pin />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Container>
    );
};

export default index;
