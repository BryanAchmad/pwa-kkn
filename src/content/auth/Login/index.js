import axios from 'src/api/axios';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
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
import AuthContext from 'src/contexts/AuthProvider';

const LOGIN_URL = '/login';

const index = () => {
  const { setAuth } = useContext(AuthContext);
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

  const LoginUser = () => {
    // console.log(credentials);
    // axios.defaults.withCredentials = true;
    axios
      .post(LOGIN_URL, credentials, {
        headers: { 'content-type': 'application/json' },
        withCredentials: true
      })
      .then((response) => {
        console.log(response);
        const nim = response?.data?.nim;
        const nama = response?.data?.idMahasiswa?.nama;
        const kelompok = response?.data?.kelompok;
        const access_token = response?.data?.access_token;
        setAuth({ nim, nama, kelompok, access_token });
        // process.exit();
        // setToken(response.data?.data?.access_token);
      })
      .catch((e) => console.log(e));
  };

  //   debugger;
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
                <Typography variant="h4">Login dulu bestie</Typography>
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
                  type={credentials.showPass ? 'text' : 'password'}
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
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={LoginUser}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      {/* <Grid container alignItems="center">
      <Grid item md={10} lg={8} mx="auto">
          <Typography variant="h1">Login</Typography>
          <Card>
              <CardContent>
                  <FormGroup className="form-login">
                      <TextField
                          name="nim"
                          id="outlined-basic"
                          label="NIM"
                          variant="outlined"
                          className="form-login__field"
                          onChange={handleLogin}
                      />
                      <TextField
                          name="pic"
                          type="password"
                          id="outlined-basic"
                          label="PIC"
                          variant="outlined"
                          className="form-login__field"
                          onChange={handleLogin}
                      />
                      <Button
                          variant="contained"
                          color="primary"
                      >
                          Login
                      </Button>
                  </FormGroup>
              </CardContent>
          </Card>
      </Grid>
  </Grid> */}
    </Container>
  );
};

export default index;

index.propTypes = {
  setToken: PropTypes.func.isRequired
};
