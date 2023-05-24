// import axios from 'src/api/axios';
import React, { useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    TextField,
    Paper,
    InputAdornment,
    IconButton
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, Person, VisibilityOff, Pin } from '@mui/icons-material';
import { useAuthentication } from 'src/contexts/AuthContext';
import { useNavigate } from 'react-router';
import axios from 'src/api/axios';

const index = () => {
    const { login } = useAuthentication();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [credentials, setCrendentials] = useState({
        nim: '',
        pic: '',
        showPass: ''
    });

    const handleShowPassword = () => {
        setCrendentials({
            ...credentials,
            showPass: !credentials.showPass
        });
    };

    const handleSubmit = async (e) => {
        console.log(credentials);
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('/login', credentials);
            console.log('response', response);
            if (response.status === 200) {
                await login(response.data);
                setIsLoading(false);
                navigate('/', { replace: true });
            } else {
                console.log('login salah');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('error', error);
            setIsLoading(false);
        }
    };

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
                                    Halaman Login
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
                                <LoadingButton
                                    fullWidth
                                    variant="contained"
                                    loadingPosition="center"
                                    loading={isLoading}
                                    onClick={handleSubmit}
                                >
                                    Sign In
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Container>
    );
};

export default index;
