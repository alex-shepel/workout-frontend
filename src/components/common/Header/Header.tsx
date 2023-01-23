import React, { FC } from 'react';
import { AppBar, Box, CircularProgress, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavDrawer } from 'components/common';
import { useAppContext, usePage } from 'hooks/utils';
import { NavDrawerContext } from 'context/NavDrawer.context';
import { Path } from 'types/enums';
import { useAuthService } from 'hooks/services';
import { useMutation } from 'react-query';
import s from './styles';

const usePathTitle = () => {
  const page = usePage();
  switch (page) {
    case Path.LOGIN:
    case Path.REGISTER:
      return 'Authentication';
    case Path.DIAGRAM:
      return 'Diagram';
    case Path.TRAINING:
      return 'Training';
    case Path.EXERCISES:
      return 'Exercises';
    case Path.TEMPLATES:
      return 'Templates';
    default:
      return 'Workout';
  }
};

const Header: FC = () => {
  const navDrawer = useAppContext(NavDrawerContext);
  const title = usePathTitle();
  const authService = useAuthService();

  const { mutate: logout, isLoading: isAuthing } = useMutation(authService.logout);

  return (
    <Box>
      <AppBar position="static">
        {title === 'Authentication' ? (
          <Toolbar sx={s.authToolbar}>
            <Typography variant="h6">{title}</Typography>
          </Toolbar>
        ) : (
          <Toolbar sx={s.commonToolbar}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={() => navDrawer.toggle()}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">{title}</Typography>
            <IconButton size="large" edge="start" color="inherit" onClick={() => logout()}>
              {isAuthing ? <CircularProgress size={18} color={'inherit'} /> : <LogoutIcon />}
            </IconButton>
          </Toolbar>
        )}
      </AppBar>
      <NavDrawer />
    </Box>
  );
};

export default Header;
