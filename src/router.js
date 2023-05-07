import { Suspense, lazy } from 'react';
// import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
// import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { Navigate } from 'react-router';

const Loader = (Component) => (props) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

// import AuthContext from './contexts/AuthProvider';

// const PublicRoute = () => {
//   const auth = useContext(AuthContext);

//   return !auth.auth ? <Outlet /> : <Navigate to="/" replace />;
// };

// const ProtectedRoute = () => {
//   const auth = useContext(AuthContext);
//   return auth.auth ? <Outlet /> : <Navigate to="/login" replace />;
// };
// Pages

// const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

// const Tasks = Loader(lazy(() => import('src/content/dashboards/Tasks')));

// Applications

// const Messenger = Loader(
//   lazy(() => import('src/content/applications/Messenger'))
// );
// const Transactions = Loader(
//   lazy(() => import('src/content/applications/Transactions'))
// );
// const UserProfile = Loader(
//   lazy(() => import('src/content/applications/Users/profile'))
// );
// const UserSettings = Loader(
//   lazy(() => import('src/content/applications/Users/settings'))
// );

// Components

// const Buttons = Loader(
//   lazy(() => import('src/content/pages/Components/Buttons'))
// );
// const Modals = Loader(
//   lazy(() => import('src/content/pages/Components/Modals'))
// );
// const Accordions = Loader(
//   lazy(() => import('src/content/pages/Components/Accordions'))
// );
// const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
// const Badges = Loader(
//   lazy(() => import('src/content/pages/Components/Badges'))
// );
// const Tooltips = Loader(
//   lazy(() => import('src/content/pages/Components/Tooltips'))
// );
// const Avatars = Loader(
//   lazy(() => import('src/content/pages/Components/Avatars'))
// );
// const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
// const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

const ProfilePage = Loader(
    lazy(() => import('src/content/dashboards/Profile'))
);

const Kelompok = Loader(lazy(() => import('src/content/dashboards/Kelompok')));
const ProgramKerja = Loader(
    lazy(() => import('src/content/dashboards/ProgramKerja/Index'))
);
const DetailsProgramKerja = Loader(
    lazy(() => import('src/content/dashboards/ProgramKerja/Details'))
);
const LaporanAkhir = Loader(
    lazy(() => import('src/content/dashboards/Laporan/LaporanAkhir'))
);
const ProfilDesa = Loader(
    lazy(() => import('src/content/dashboards/Laporan/ProfilDesa'))
);
const MediaPublikasi = Loader(
    lazy(() => import('src/content/dashboards/Laporan/MediaPublikasi'))
);

// Auth

const LoginPage = Loader(lazy(() => import('src/content/auth/Login')));
const RegisterPage = Loader(lazy(() => import('src/content/auth/Register')));

// Status

// const Status404 = Loader(
//   lazy(() => import('src/content/pages/Status/Status404'))
// );
// const Status500 = Loader(
//   lazy(() => import('src/content/pages/Status/Status500'))
// );
// const StatusComingSoon = Loader(
//   lazy(() => import('src/content/pages/Status/ComingSoon'))
// );
// const StatusMaintenance = Loader(
//   lazy(() => import('src/content/pages/Status/Maintenance'))
// );

const routes = [
    {
        path: 'login',
        element: <LoginPage />
    },
    {
        path: 'register',
        element: <RegisterPage />
    },
    {
        path: '',
        element: <SidebarLayout />,
        private: true,
        children: [
            {
                path: '/',
                element: <ProfilePage />,
                private: true
            },
            {
                path: 'dashboard',
                element: <Navigate to="/" replace />,
                private: true
            }
        ]
    },
    {
        path: 'kelompok',
        element: <SidebarLayout />,
        private: true,
        children: [
            {
                path: '',
                element: <Kelompok />,
                private: true
            }
        ]
    },
    {
        path: 'pembimbing',
        element: <SidebarLayout />,
        children: [
            {
                path: '',
                element: <Kelompok />,
                private: true
            }
        ]
    },
    {
        path: 'program-kerja',
        element: <SidebarLayout />,
        private: true,
        children: [
            {
                path: '',
                element: <ProgramKerja />,
                private: true
            },
            {
                path: 'details',
                element: <DetailsProgramKerja />,
                private: true
            }
        ]
    },
    {
        path: 'laporan',
        element: <SidebarLayout />,
        private: true,
        children: [
            {
                path: 'laporan-akhir',
                element: <LaporanAkhir />,
                private: true
            },
            {
                path: 'profil-desa',
                element: <ProfilDesa />,
                private: true
            },
            {
                path: 'media-publikasi',
                element: <MediaPublikasi />,
                private: true
            }
        ]
    }
];

export default routes;
