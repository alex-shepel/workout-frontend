import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, CircularProgress, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavDrawer } from 'components/common';
import { useAppContext } from 'hooks/utils';
import { NavDrawerContext } from 'context/NavDrawer.context';
import { Paths } from 'types/enums';
import { useAuthService } from 'hooks/services';
import { useMutation } from 'react-query';
import { AuthContext } from 'context/Auth.context';
import s from './styles';

const usePathTitle = () => {
  const location = useLocation();
  const routes = location.pathname.split('/');
  const page = routes[1] as Paths;
  switch (page) {
    case Paths.LOGIN:
    case Paths.REGISTER:
      return 'Authentication';
    case Paths.DIAGRAM:
      return 'Diagram';
    case Paths.TRAINING:
      return 'Training';
    case Paths.EXERCISES:
      return 'Exercises';
    case Paths.TEMPLATES:
      return 'Templates';
    default:
      return 'Workout';
  }
};

const Header: FC = () => {
  const navDrawer = useAppContext(NavDrawerContext);
  const authContext = useAppContext(AuthContext);
  const title = usePathTitle();
  const authService = useAuthService();
  const navigate = useNavigate();

  const { mutate: logout, isLoading: isAuthing } = useMutation(authService.logout, {
    onSuccess: () => {
      authContext.setData(null);
      navigate('/login');
    },
  });

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
