import React, { FC } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavDrawer } from 'components/common';
import { useAppContext } from 'hooks/index';
import { NavDrawerContext } from 'context/NavDrawer';
import s from './styles';

const Header: FC = () => {
  const navDrawer = useAppContext(NavDrawerContext);
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={s.toolbar}>
          <IconButton size="large" edge="start" color="inherit" onClick={() => navDrawer.toggle()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Workout</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <NavDrawer />
    </Box>
  );
};

export default Header;
