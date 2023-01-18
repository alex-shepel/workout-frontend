import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { AuthEntity } from 'types/entities';
import { StateSetter } from 'types/utils';
import { AxiosRequestHeaders } from 'axios';
import { useAuthService } from 'hooks/services';
import { useAxios } from 'hooks/utils';

interface Context {
  data: AuthEntity | null;
  setData: StateSetter<AuthEntity | null>;
}

const AuthContext = createContext<Context | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = props => {
  const axios = useAxios();
  const authService = useAuthService();

  const [data, setData] = useState<AuthEntity | null>(null);

  useEffect(() => {
    const requestInterceptorId = axios.interceptors.request.use(
      config => {
        const headers = config?.headers as AxiosRequestHeaders;
        if (!headers['Authorization'] && data?.AccessToken) {
          headers['Authorization'] = `Bearer ${data?.AccessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseInterceptorId = axios.interceptors.response.use(
      response => response,
      async error => {
        const newConfig = error.config;
        if (error.response?.status === 401 && !newConfig?.sent) {
          newConfig.sent = true;
          const user = await authService.refresh();
          setData(user);
          newConfig.headers['Authorization'] = `Bearer ${user.AccessToken}`;
          return axios(newConfig);
        }
        setData(null);
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptorId);
      axios.interceptors.response.eject(responseInterceptorId);
    };
  }, [authService, axios, data?.AccessToken]);

  const context = useMemo<Context>(() => ({ data, setData }), [data]);

  return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
