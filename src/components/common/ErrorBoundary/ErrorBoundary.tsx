import React, { FC, ReactNode } from 'react';
import ReactErrorBoundary from './react';
import AxiosErrorBoundary from './axios';

const ErrorBoundary: FC<{ children: ReactNode }> = (props) => {
  return (
    <ReactErrorBoundary>
      <AxiosErrorBoundary>{props.children}</AxiosErrorBoundary>
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
