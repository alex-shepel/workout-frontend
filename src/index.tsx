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
import { Path } from 'types/enums';
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
                  <Route index element={<Navigate to={`/${Path.LOGIN}`} />} />
                  <Route path={Path.LOGIN} element={<LoginPage />} />
                  <Route path={Path.REGISTER} element={<RegisterPage />} />
                  <Route path={Path.DIAGRAM} element={<DiagramPage />} />
                  <Route path={Path.TRAINING} element={<TrainingPage />} />
                  <Route path={Path.EXERCISES} element={<ExercisesPage />} />
                  <Route path={Path.TEMPLATES} element={<TemplatesPage />} />
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
