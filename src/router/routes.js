import { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router';
import AuthContext from 'src/contexts/AuthContext';
import SuspenseLoader from 'src/components/SuspenseLoader';
import SidebarLayout from 'src/layouts/SidebarLayout';

const Loader = (Component) => (props) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );
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

const GuestRoute = () => {
    const authContext = useContext(AuthContext);

    return !authContext.auth ? <Outlet /> : <Navigate to="/" replace />;
};

const ProtectedRoutes = () => {
    const authContext = useContext(AuthContext);

    return authContext.auth ? <Outlet /> : <Navigate to="/login" replace />;
};

const Router = () => {
    const authContext = useContext(AuthContext);

    if (authContext.auth == null) return <h1>Loading ....</h1>;

    return (
        <Routes>
            <Route element={<GuestRoute />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
                <Route element={<SidebarLayout />} path="">
                    <Route path="/" element={<ProfilePage />} />
                    <Route
                        path="dashboard"
                        element={<Navigate to="/" replace />}
                    />
                </Route>
                <Route element={<SidebarLayout />} path="kelompok">
                    <Route path="" element={<Kelompok />} />
                </Route>
                <Route element={<SidebarLayout />} path="pembimbing">
                    <Route path="" element={<Kelompok />} />
                </Route>
                <Route element={<SidebarLayout />} path="program-kerja">
                    <Route path="" element={<ProgramKerja />} />
                    <Route path="details" element={<DetailsProgramKerja />} />
                </Route>
                <Route element={<SidebarLayout />} path="laporan">
                    <Route path="laporan-akhir" element={<LaporanAkhir />} />
                    <Route path="profil-desa" element={<ProfilDesa />} />
                    <Route
                        path="media-publikasi"
                        element={<MediaPublikasi />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;
