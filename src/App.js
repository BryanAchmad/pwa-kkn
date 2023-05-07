import { useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';

// import router from 'src/router';
// import PropTypes from 'prop-types';
import router from './router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import {
    // Backdrop,
    // CircularProgress,
    CssBaseline
    // Typography
} from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
// import { isAuthenticated } from 'src/api/auth';
import { useAuthentication } from 'src/contexts/AuthContext';
// import { useConnection } from './contexts/ConnectionContext';
// import { ContentCopy } from '@mui/icons-material';
// import Router from './router/routes';
// import { useRoutes } from 'react-router';
// import { AuthProvider } from './contexts/AuthProvider';
// import { useAPI } from './contexts/ApiContext';
// import { Box } from '@mui/system';
// import ApiContext from './contexts/ApiContext';
// import { useState } from 'react';
// import { useEffect, useState } from 'react';
// import { Suspense, lazy } from 'react';
import { useConnection } from 'src/contexts/ConnectionContext';

// import SuspenseLoader from 'src/components/SuspenseLoader';

// const Loader = (Component) => (props) =>
//   (
//     <Suspense fallback={<SuspenseLoader />}>
//       <Component {...props} />
//     </Suspense>
//   );
// const LoginPage = Loader(lazy(() => import('src/content/auth/Login')));

// import LoginPage from 'src/content/auth/Login';

// const LoadingScreen = ({ open }) => {
//   console.log('loading');
//   return (
//     <Backdrop
//       open={open}
//       sx={{
//         color: '#fff',
//         zIndex: (theme) => theme.zIndex.drawer + 10
//       }}
//     >
//       <Box
//         sx={{
//           position: 'fixed',
//           left: 0,
//           top: 0,
//           width: '100%',
//           height: '100%'
//         }}
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <CircularProgress size={64} disableShrink thickness={3} />
//         <Typography>Please Wait 🔥</Typography>
//       </Box>
//     </Backdrop>
//   );
// };

function App() {
    const { isConnected } = useConnection();
    const useAuthRoutes = (routes) => {
        const { authenticated } = useAuthentication();
        console.log('auth', authenticated);
        // const Navigate = useNavigate();
        // const isAuth = isAuthenticated; /* your authentication logic here */

        return useRoutes(
            routes.map((route) => {
                console.log('route', route.path);
                if (route.private && !authenticated) {
                    return {
                        ...route,
                        element: <Navigate to="/login" replace={true} />,
                        // ...route,
                        // element: authenticated ? (
                        //     route.element
                        // ) : (
                        //     <Navigate to="/login" replace />
                        // )
                    };
                }
                return route;
            })
        );
    };
    // const content = useRoutes(router);
    const element = useAuthRoutes(router);

    // const notify = () => {
    //     toast('you are offline', {
    //         position: toast.POSITION.TOP_RIGHT
    //     });
    // };
    // console.log(element);
    // const [status, setStatus] = useState(false);

    // const setIsLoaded = (stat) => {
    //   setStatus(stat);
    // };

    // const isLoaded = () => {
    //   return status;
    // };

    // if (!status) return
    // const [loading, setLoading] = useState(false);
    // const { proker, prokers, fetching } = useProkerData();
    // const { prokers, divisi, mediaPub, user } = useProkerData(setIsLoaded());
    // console.log('from app', prokers);
    // const content = useRoutes(router);

    // const setIsLoaded = (value) => {
    //   setIsFetching(value);
    // };

    // const isLoaded = () => {
    //   return isFetching;
    // };

    // const handleStatus = () => {
    //   if (proker === undefined && prokers === undefined) {
    //     setLoading(true);
    //   } else {
    //     setLoading(false);
    //   }
    // };

    // if (!isLoaded) return <LoadingScreen />;

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
    // const { isLoading } = useAPI();

    // if (isLoading) {
    //   return <LoadingScreen />;
    // }

    return (
        <>
            {/* {isLoading ? (
        <LoadingScreen open={isLoading} />
      ) : ( */}
            <ThemeProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CssBaseline />
                    {/* {!isConnected ?? (
                        <>
                            
                            <ToastContainer autoClose={false} />
                        </>
                    )} */}
                    {/* {content} */}
                    {element}
                    {/* <Router /> */}
                </LocalizationProvider>
            </ThemeProvider>
            {/* )} */}
        </>
    );
}
export default App;

// App.propTypes = {
//   setIsLoaded: PropTypes.func.isRequired
// };
