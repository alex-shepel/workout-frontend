import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  AuthPage,
  DiagramPage,
  ExercisesPage,
  TemplatesPage,
  TrainingPage,
  NotFoundPage,
} from 'pages';
import { Layout } from 'components/common';
import { CssBaseline } from '@mui/material';
import { NavDrawerProvider } from 'context/NavDrawer';
import { Paths } from 'types/enums';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <NavDrawerProvider>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route index element={<Navigate to={`/${Paths.AUTH}`} />} />
            <Route path={Paths.AUTH} element={<AuthPage />} />
            <Route path={Paths.DIAGRAM} element={<DiagramPage />} />
            <Route path={Paths.TRAINING} element={<TrainingPage />} />
            <Route path={Paths.EXERCISES} element={<ExercisesPage />} />
            <Route path={Paths.TEMPLATES} element={<TemplatesPage />} />
            <Route path={'*'} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </NavDrawerProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
