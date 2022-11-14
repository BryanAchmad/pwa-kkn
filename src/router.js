import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
// import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

// const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

// const Tasks = Loader(lazy(() => import('src/content/dashboards/Tasks')));

// Applications

// const Messenger = Loader(
//   lazy(() => import('src/content/applications/Messenger'))
// );
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

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
  // {
  //   path: '',
  //   element: <BaseLayout />,
  //   children: [
  //     {
  //       path: '/',
  //       element: <Overview />
  //     },
  //     {
  //       path: 'overview',
  //       element: <Navigate to="/" replace />
  //     },
  //     {
  //       path: 'status',
  //       children: [
  //         {
  //           path: '',
  //           element: <Navigate to="404" replace />
  //         },
  //         {
  //           path: '404',
  //           element: <Status404 />
  //         },
  //         {
  //           path: '500',
  //           element: <Status500 />
  //         },
  //         {
  //           path: 'maintenance',
  //           element: <StatusMaintenance />
  //         },
  //         {
  //           path: 'coming-soon',
  //           element: <StatusComingSoon />
  //         }
  //       ]
  //     },
  //     {
  //       path: '*',
  //       element: <Status404 />
  //     }
  //   ]
  // },
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <ProfilePage />
      }
    ]
  },
  {
    path: 'kelompok',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Kelompok />
      }
    ]
  },
  {
    path: 'pembimbing',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Kelompok />
      }
    ]
  },
  {
    path: 'program-kerja',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <ProgramKerja />
      },
      {
        path: 'details',
        element: <DetailsProgramKerja />
      }
    ]
  },
  {
    path: 'laporan',
    element: <SidebarLayout />,
    children: [
      {
        path: 'laporan-akhir',
        element: <LaporanAkhir />
      },
      {
        path: 'profil-desa',
        element: <ProfilDesa />
      },
      {
        path: 'media-publikasi',
        element: <MediaPublikasi />
      }
    ]
  },
  // {
  //   path: '',
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: '/',
  //       element: <Tasks />
  //     },
  //     {
  //       path: 'tasks',
  //       element: <Navigate to="tasks" replace />
  //     },
  //     {
  //       path: 'messenger',
  //       element: <Messenger />
  //     }
  //   ]
  // },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
