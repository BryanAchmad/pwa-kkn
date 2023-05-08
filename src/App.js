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
import { useEffect } from 'react';
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
// import { useConnection } from 'src/contexts/ConnectionContext';

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
    // const { isConnected } = useConnection();
    const useAuthRoutes = (routes) => {
        // const navigate = useNavigate();

        const { authenticated } = useAuthentication();
        // const token = localStorage.getItem('token');
        console.log('auth', authenticated);
        // const Navigate = useNavigate();
        // const isAuth = isAuthenticated; /* your authentication logic here */

        return useRoutes(
            routes.map((route) => {
                if (route.private && !authenticated) {
                    return {
                        ...route,
                        element: <Navigate to="/login" replace/>
                    };
                }
                return route;
            })
        );
    };
    // const content = useRoutes(router);
    const element = useAuthRoutes(router);

    useEffect(() => {
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data.type === 'background-sync-success') {
                console.log(
                    'Background sync request sent successfully:',
                    event.data.requestUrl
                );
                // Provide feedback to the user here
            }
        });
    });

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
