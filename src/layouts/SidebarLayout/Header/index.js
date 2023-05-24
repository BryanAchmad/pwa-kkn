import { useContext, useEffect, useState } from 'react';

import {
    Box,
    alpha,
    lighten,
    IconButton,
    Tooltip,
    styled,
    useTheme,
    Typography,
    Stack
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderUserbox from './Userbox';

const HeaderWrapper = styled(Box)(
    ({ theme }) => `
        height: 100;
        color: ${theme.header.textColor};
        padding: 0;
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: flex-end;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
    const [online, setOnline] = useState(window.navigator.onLine);
    const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
    const theme = useTheme();

    useEffect(() => {
        window.addEventListener('offline', () =>
            setOnline(window.navigator.onLine)
        );

        window.addEventListener('online', () =>
            setOnline(window.navigator.onLine)
        );
    });

    return (
        <>
            <HeaderWrapper
                display="flex"
                alignItems="center"
                sx={{
                    boxShadow:
                        theme.palette.mode === 'dark'
                            ? `0 1px 0 ${alpha(
                                  lighten(theme.colors.primary.main, 0.7),
                                  0.15
                              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
                            : `0px 2px 8px -3px ${alpha(
                                  theme.colors.alpha.black[100],
                                  0.2
                              )}, 0px 5px 22px -4px ${alpha(
                                  theme.colors.alpha.black[100],
                                  0.1
                              )}`
                }}
            >
                <Stack
                    direction="column"
                    width="100%"
                    sx={{ margin: 0, padding: 0 }}
                >
                    {!online ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                background: 'red',
                                color: 'white',
                                padding: 0,
                                margin: 0
                            }}
                        >
                            <Typography variant="h5">
                                Offline mode, you are not connected to a network
                            </Typography>
                        </Box>
                    ) : (
                        ''
                    )}

                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ paddingX: 2 }}
                    >
                        <HeaderUserbox />
                        <Box
                            component="span"
                            sx={{
                                ml: 2,
                                display: { lg: 'none', xs: 'inline-block' }
                            }}
                        >
                            <Tooltip arrow title="Toggle Menu">
                                <IconButton
                                    color="primary"
                                    onClick={toggleSidebar}
                                >
                                    {!sidebarToggle ? (
                                        <MenuTwoToneIcon fontSize="small" />
                                    ) : (
                                        <CloseTwoToneIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Stack>
            </HeaderWrapper>
        </>
    );
}

export default Header;
