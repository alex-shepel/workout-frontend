import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Axios } from 'api/axios';
import { AxiosError } from 'axios';
import { nanoid } from 'nanoid';
import { Snackbar } from '@mui/material';

export interface AxiosErrorExtended extends AxiosError {
  id: string;
  message: string;
}

const getStandardErrorMessage = (code: number) => {
  switch (code) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Not Authorized';
    case 404:
      return '404 Not Found';
    case 504:
      return 'Internal Server Error';
    case 500:
      return 'Something went wrong';
    default:
      return 'Something went wrong';
  }
};

const AxiosErrorBoundary: FC<{ children: ReactNode }> = props => {
  const [errors, setErrors] = useState<AxiosErrorExtended[]>([]);

  const removeError = (id: string) => setErrors(errors => errors.filter(error => error.id !== id));

  /* REQUESST interceptor */
  useEffect(() => {
    const reqInterceptor = Axios.interceptors.request.use(undefined, (error: AxiosError) => {
      setErrors(errors => [
        ...errors,
        { ...error, message: "Application couldn't send the request.", id: nanoid() },
      ]);
    });
    return () => Axios.interceptors.request.eject(reqInterceptor);
  });

  /* RESPONSE interceptor */
  useEffect(() => {
    const resInterceptor = Axios.interceptors.response.use(undefined, async (error: AxiosError) => {
      if (!error.response) {
        setErrors(errors => [
          ...errors,
          { ...error, message: 'There is no server response', id: nanoid() },
        ]);
        return;
      }
      const message = error.response.statusText || getStandardErrorMessage(+error.response.status);
      setErrors(errors => [...errors, { ...error, message, id: nanoid() }]);
    });
    return () => Axios.interceptors.response.eject(resInterceptor);
  }, []);

  return (
    <>
      {props.children}
      {errors.map(error => (
        <Snackbar
          id={error.id}
          open={errors.includes(error)}
          autoHideDuration={5000}
          onClose={() => removeError(error.id)}
          message={error.message}
        />
      ))}
    </>
  );
};

export default AxiosErrorBoundary;
