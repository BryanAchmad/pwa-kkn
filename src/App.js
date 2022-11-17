import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
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

function App() {
  const content = useRoutes(router);

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
