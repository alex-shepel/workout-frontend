import React, { FC } from 'react';
import { Header } from 'components/common';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const Layout: FC = () => (
  <>
    <Header />
    <Container>
      <Outlet />
    </Container>
  </>
);

export default Layout;
