import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Hidden,
    lighten,
    Popover,
    Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { useAPI } from 'src/contexts/ApiContext';
import { useAuthentication } from 'src/contexts/AuthContext';

const UserBoxButton = styled(Button)(
    ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
    ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
    ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
    const navigate = useNavigate();
    const { user } = useAPI();
    const { logout } = useAuthentication();

    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSignOut = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    return (
        <>
            <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
                <Avatar
                    variant="rounded"
                    alt={user?.data?.data?.nama}
                    src="/static/images/avatars/4.jpg"
                />
                <Hidden mdDown>
                    <UserBoxText>
                        <UserBoxLabel variant="body1">
                            {user?.data?.data?.nama}
                        </UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {user?.data?.data?.nim}
                        </UserBoxDescription>
                    </UserBoxText>
                </Hidden>
                <Hidden smDown>
                    <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
                </Hidden>
            </UserBoxButton>
            <Popover
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuUserBox sx={{ minWidth: 210 }} display="flex">
                    <Avatar
                        variant="rounded"
                        alt={user?.data?.data?.nama}
                        src="/static/images/avatars/1.jpg"
                    />
                    <UserBoxText>
                        <UserBoxLabel variant="body1">
                            {user?.data?.data?.nim}
                        </UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {user?.data?.data?.jurusan}
                        </UserBoxDescription>
                    </UserBoxText>
                </MenuUserBox>
                <Divider sx={{ mb: 0 }} />
                <Box sx={{ m: 1 }}>
                    <Button color="primary" fullWidth onClick={handleSignOut}>
                        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                        Sign out
                    </Button>
                </Box>
            </Popover>
        </>
    );
}

export default HeaderUserbox;
