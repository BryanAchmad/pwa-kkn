import {
    Box,
    alpha,
    lighten,
    useTheme
    // Typography
    // CircularProgress,
    // Backdrop,
    // Typography
} from '@mui/material';
import { Outlet } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';

import Sidebar from './Sidebar';
import Header from './Header';
import { useAPI } from 'src/contexts/ApiContext';
// import { useConnection } from 'src/contexts/ConnectionContext';

// const Loading = () => {
//   console.log('loading');
//   return (
//     <Backdrop
//       // open={open}
//       sx={{
//         color: '#fff',
//         zIndex: (theme) => theme.zIndex.drawer + 100
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

const SidebarLayout = () => {
    const theme = useTheme();
    const { isLoading } = useAPI();
    console.log('from layout', isLoading);
    // const notify = () => {
    //     toast.warn('You are now offline, please check your connection', {
    //         position: toast.POSITION.TOP_RIGHT
    //     });
    // };
    // console.log('from layout', prokers);

    return (
        <>
            
            {/* <Backdrop
        open={isLoading}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 100
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={64} disableShrink thickness={3} />
          <Typography>Please Wait 🔥</Typography>
        </Box>
      </Backdrop> */}

            <Box
                sx={{
                    flex: 1,
                    height: '100%',

                    '.MuiPageTitle-wrapper': {
                        background:
                            theme.palette.mode === 'dark'
                                ? theme.colors.alpha.trueWhite[5]
                                : theme.colors.alpha.white[50],
                        marginBottom: `${theme.spacing(4)}`,
                        boxShadow:
                            theme.palette.mode === 'dark'
                                ? `0 1px 0 ${alpha(
                                      lighten(theme.colors.primary.main, 0.7),
                                      0.15
                                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                                : `0px 2px 4px -3px ${alpha(
                                      theme.colors.alpha.black[100],
                                      0.1
                                  )}, 0px 5px 12px -4px ${alpha(
                                      theme.colors.alpha.black[100],
                                      0.05
                                  )}`
                    }
                }}
            >
                <>
                    <Sidebar />
                    <Header />
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 5,
                            display: 'block',
                            flex: 1,
                            pt: `${theme.header.height}`,
                            [theme.breakpoints.up('lg')]: {
                                ml: `${theme.sidebar.width}`
                            }
                        }}
                    >
                        <Box display="block">
                            {/* <Loading open={isLoading} /> */}
                            <Outlet />
                        </Box>
                        {/* )} */}
                    </Box>
                </>
            </Box>
        </>
    );
};

export default SidebarLayout;
