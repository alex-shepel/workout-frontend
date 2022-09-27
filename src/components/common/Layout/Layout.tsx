import React, { FC } from 'react';
import { Header } from 'components/common';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import s from './styles';

const Layout: FC = () => (
  <>
    <Header />
    <Container sx={s.container}>
      <Outlet />
    </Container>
  </>
);

export default Layout;
