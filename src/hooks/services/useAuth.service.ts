import { AuthEntity, UserEntity } from 'types/entities';
import { useAxios } from 'hooks/utils';
import { useMemo } from 'react';
import { Service } from 'types/common';

const SERVICE_ENDPOINT = 'auth';

interface RegisterPayload extends Pick<UserEntity, 'Name' | 'Email'> {
  Password: string;
}

interface LoginPayload extends Pick<UserEntity, 'Email'> {
  Password: string;
}

interface AuthService extends Service {
  readonly endpoint: typeof SERVICE_ENDPOINT;
  readonly register: (payload: RegisterPayload) => Promise<AuthEntity>;
  readonly login: (payload: LoginPayload) => Promise<AuthEntity>;
  readonly getCurrentUser: () => Promise<UserEntity>;
  readonly refresh: () => Promise<AuthEntity>;
  readonly logout: () => Promise<UserEntity>;
}

const useAuthService = () => {
  const axios = useAxios();

  return useMemo<AuthService>(() => {
    const register: AuthService['register'] = async payload => {
      const { data } = await axios.post(`${SERVICE_ENDPOINT}/register`, payload);
      return data;
    };

    const login: AuthService['login'] = async payload => {
      const { data } = await axios.post(`${SERVICE_ENDPOINT}/login`, payload);
      return data;
    };

    const getCurrentUser: AuthService['getCurrentUser'] = async () => {
      const { data } = await axios.get(`${SERVICE_ENDPOINT}/user`);
      return data;
    };

    const refresh: AuthService['refresh'] = async () => {
      const { data } = await axios.get(`${SERVICE_ENDPOINT}/refresh`);
      return data;
    };

    const logout: AuthService['logout'] = async () => {
      const { data } = await axios.post(`${SERVICE_ENDPOINT}/logout`);
      return data;
    };

    return { endpoint: SERVICE_ENDPOINT, register, login, getCurrentUser, refresh, logout };
  }, [axios]);
};

export default useAuthService;
