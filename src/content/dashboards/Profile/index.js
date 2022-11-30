import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { useState } from 'react';
import History from './Tabs/History';

import {
  Grid,
  Container,
  styled,
  Tabs,
  Tab,
  Typography,
  Box
} from '@mui/material';
// import {
//   Inbox as InboxIcon,
//   Drafts as DraftsIcon,
//   PermIdentity,
//   Call,
//   Cake,
//   School,
//   Lightbulb
// } from '@mui/icons-material';
import ProfileCover from './ProfileCover';
import Aktivitas from './Tabs/Aktivitas';
// import RecentActivity from './RecentActivity';
// import Feed from './Feed';
// import PopularTags from './PopularTags';
// import MyCards from './MyCards';
// import Addresses from './Addresses';

const TabsWrapper = styled(Tabs)(
  () => `
        .MuiTabs-root  {
            background-color: white;
        }
      .MuiTabs-scrollableX {
        overflow-x: auto !important;

        
      }
  `
);

// const CustomBox = styled(Box)(
//   () => `
//         .MuiBox-root {
//             background-color: #ffffff;
//         }
//     `
// );

const UserAccount = () => {
  const [currentTab, setCurrentTab] = useState('history');
  const tabs = [
    { value: 'history', label: 'History Login' },
    { value: 'activity', label: 'Aktivitas Terakhir' }
  ];

 

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  const user = {
    savedCards: 7,
    name: 'Catherine Pike',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
    jobtitle: 'Web Developer',
    location: 'Barcelona, Spain',
    followers: '465'
  };

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Box
              component="div"
              sx={{
                height: 'auto',
                padding: '36px',
                borderRadius: '16px'
              }}
            >
              <Typography variant="h2" component="h2" gutterBottom>
                Selamat Datang Di Sistem Informasi KKN
              </Typography>
              <Typography variant="subtitle2">
                UNIVERSITAS MUHAMMADIYAH MALANG
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TabsWrapper
                  sx={{
                    height: 'auto',
                    padding: '12px',
                    borderRadius: '12px'
                  }}
                  onChange={handleTabsChange}
                  value={currentTab}
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </TabsWrapper>
              </Grid>
              <Grid item xs={12}>
                {currentTab === 'history' && <History />}
                {currentTab === 'activity' && <Aktivitas />}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            {/* {currentTab === 'activity' && (
                            <EkonomiTab data={ekonomi} />
                        )} */}
            {/* {{currentTab === 'notifications' && <NotificationsTab />}
                        {currentTab === 'security' && <SecurityTab />} */}
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid> */}
          {/* <Grid item xs={12} md={8}>
            <Feed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default UserAccount;
