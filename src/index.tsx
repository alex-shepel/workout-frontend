import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  DiagramPage,
  ExercisesPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  TemplatesPage,
  TrainingPage,
} from 'pages';
import { Layout } from 'components/common';
import { CssBaseline } from '@mui/material';
import { NavDrawerProvider } from 'context/NavDrawer.context';
import { Paths } from 'types/enums';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ErrorBoundary from 'components/common/ErrorBoundary';
import { AuthProvider } from 'context/Auth.context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CssBaseline />
          <AuthProvider>
            <NavDrawerProvider>
              <Routes>
                <Route path={'/'} element={<Layout />}>
                  <Route index element={<Navigate to={`/${Paths.REGISTER}`} />} />
                  <Route path={Paths.LOGIN} element={<LoginPage />} />
                  <Route path={Paths.REGISTER} element={<RegisterPage />} />
                  <Route path={Paths.DIAGRAM} element={<DiagramPage />} />
                  <Route path={Paths.TRAINING} element={<TrainingPage />} />
                  <Route path={Paths.EXERCISES} element={<ExercisesPage />} />
                  <Route path={Paths.TEMPLATES} element={<TemplatesPage />} />
                  <Route path={'*'} element={<NotFoundPage />} />
                </Route>
              </Routes>
            </NavDrawerProvider>
          </AuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
