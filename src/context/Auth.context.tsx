import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { AuthEntity } from 'types/entities';
import { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { useAxios, usePage } from 'hooks/utils';
import { useAuthService } from 'hooks/services';
import { useNavigate } from 'react-router-dom';
import { Path } from 'types/enums';

const AuthContext = createContext<AuthEntity | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = props => {
  const page = usePage();
  const axios = useAxios();
  const navigate = useNavigate();
  const { refresh } = useAuthService();
  const [data, setData] = useState<AuthEntity | null>(null);

  /* handles navigation on session's status change */
  useEffect(() => {
    if (!data && (page === Path.LOGIN || page === Path.REGISTER)) {
      return;
    }
    if (data && (page === Path.LOGIN || page === Path.REGISTER)) {
      navigate('/diagram', { replace: true });
      return;
    }
    if (!data) {
      navigate('/login');
      return;
    }
  }, [data, navigate, page]);

  /* adds actual access token to the request's headers */
  useEffect(() => {
    const id = axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
      const headers = config.headers as AxiosRequestHeaders;
      if (data?.AccessToken) {
        headers['Authorization'] = `Bearer ${data.AccessToken}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(id);
  }, [axios.interceptors.request, data?.AccessToken]);

  /* refreshes outdated access token */
  useEffect(() => {
    const id = axios.interceptors.response.use(
      res => res,
      async (error: AxiosError) => {
        const isNotAuth = error.response?.status === 401;
        const isRefresh = error.request.responseURL.includes('api/auth/refresh');
        if (isNotAuth) {
          setData(isRefresh ? null : await refresh());
        }
        return Promise.reject(error);
      },
    );
    return () => axios.interceptors.response.eject(id);
  }, [refresh, axios.interceptors.response]);

  /* updates user's data on login and logout requests */
  useEffect(() => {
    const id = axios.interceptors.response.use((res: AxiosResponse) => {
      const url = res.request.responseURL;
      const isLogin = url.includes('api/auth/login') || url.includes('api/auth/register');
      const isLogout = url.includes('api/auth/logout');
      if (isLogin) {
        setData(res.data);
      }
      if (isLogout) {
        setData(null);
      }
      return res;
    });
    return () => axios.interceptors.response.eject(id);
  }, [axios.interceptors.response]);

  return <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
