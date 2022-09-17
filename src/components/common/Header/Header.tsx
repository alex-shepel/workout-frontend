import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavDrawer } from 'components/common';
import { useAppContext } from 'hooks/index';
import { NavDrawerContext } from 'context/NavDrawer';
import { Paths } from 'types/enums';
import s from './styles';

const usePathTitle = () => {
  const location = useLocation();
  const routes = location.pathname.split('/');
  const page = routes[1] as Paths;
  switch (page) {
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
  const title = usePathTitle();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={s.toolbar}>
          <IconButton size="large" edge="start" color="inherit" onClick={() => navDrawer.toggle()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <NavDrawer />
    </Box>
  );
};

export default Header;
