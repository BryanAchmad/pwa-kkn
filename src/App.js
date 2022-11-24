import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CircularProgress, CssBaseline, Box, Typography } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import useProkerData from './services/kelompok.service';
// import { useEffect, useState } from 'react';
// import { Suspense, lazy } from 'react';

// import SuspenseLoader from 'src/components/SuspenseLoader';

// const Loader = (Component) => (props) =>
//   (
//     <Suspense fallback={<SuspenseLoader />}>
//       <Component {...props} />
//     </Suspense>
//   );
// const LoginPage = Loader(lazy(() => import('src/content/auth/Login')));

// import LoginPage from 'src/content/auth/Login';

const LoadingScreen = () => {
  console.log('loading');
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
      <Typography>please wait until data already use 🔥</Typography>
    </Box>
  );
};

function App() {
  // const [loading, setLoading] = useState(false);
  const { proker, prokers, fetching } = useProkerData();
  console.log('from app', prokers);
  const content = useRoutes(router({ proker, prokers }));

  // const handleStatus = () => {
  //   if (proker === undefined && prokers === undefined) {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {

  // }, [proker, prokers]);

  // const getToken = () => {
  //   const tokenString = sessionStorage.getItem('access_token');
  //   const userToken = JSON.parse(tokenString);
  //   console.log(userToken);
  //   return userToken;
  // };

  // const setToken = (userToken) => {
  //   sessionStorage.setItem('access_token', JSON.stringify(userToken));
  // };
  // const [token, setToken] = useState();
  // const token = getToken();

  // if (!token) return <LoginPage setToken={setToken} />;

  return (
    <ThemeProvider>
      {fetching ? (
        <LoadingScreen />
      ) : (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
          {/* {content} */}
        </LocalizationProvider>
      )}
    </ThemeProvider>
  );
}
export default App;
