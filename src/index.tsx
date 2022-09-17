import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthPage, DiagramPage, ExercisesPage, TemplatesPage, TrainingPage } from 'pages';
import { Layout } from 'components/common';
import { CssBaseline } from '@mui/material';
import { NavDrawerProvider } from 'context/NavDrawer';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <NavDrawerProvider>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route index element={<Navigate to={'/auth'} />} />
            <Route path={'auth'} element={<AuthPage />} />
            <Route path={'diagram'} element={<DiagramPage />} />
            <Route path={'training'} element={<TrainingPage />} />
            <Route path={'exercises'} element={<ExercisesPage />} />
            <Route path={'templates'} element={<TemplatesPage />} />
            <Route path={'*'} element={<Navigate to={'/auth'} />} />
          </Route>
        </Routes>
      </NavDrawerProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
