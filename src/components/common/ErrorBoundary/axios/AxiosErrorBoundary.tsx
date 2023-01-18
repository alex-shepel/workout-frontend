import React, { FC, ReactNode, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { nanoid } from 'nanoid';
import { Snackbar } from '@mui/material';
import { useAxios } from 'hooks/utils';

export interface AxiosErrorExtended extends AxiosError {
  id: string;
  message: string;
}

const AxiosErrorBoundary: FC<{ children: ReactNode }> = props => {
  const axios = useAxios();
  const [errors, setErrors] = useState<AxiosErrorExtended[]>([]);

  const removeError = (id: string) => setErrors(errors => errors.filter(error => error.id !== id));

  /* REQUESST interceptor */
  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(
      request => request,
      (error: AxiosError) => {
        const message = "Application couldn't send the request.";
        setErrors(errors => [...errors, { ...error, message, id: nanoid() }]);
        return Promise.reject(error);
      },
    );
    return () => axios.interceptors.request.eject(reqInterceptor);
  }, [axios.interceptors.request]);

  /* RESPONSE interceptor */
  useEffect(() => {
    const resInterceptor = axios.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        const message = error.response ? error.response.statusText : 'There is no server response';
        setErrors(errors => [...errors, { ...error, message, id: nanoid() }]);
        return Promise.reject(error);
      },
    );
    return () => axios.interceptors.response.eject(resInterceptor);
  }, [axios.interceptors.response]);

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
