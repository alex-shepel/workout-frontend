import { Axios } from 'api/axios';
import { TTemplate } from 'types/db';

const API_ENDPOINT = 'templates';

const getAll = async (): Promise<TTemplate[]> => {
  const { data } = await Axios.get(API_ENDPOINT);
  return data;
};

const post = async (payload: Pick<TTemplate, 'Title' | 'Description'>): Promise<TTemplate> => {
  const { data } = await Axios.post(API_ENDPOINT, payload);
  return data;
};

const deleteById = async (id: number): Promise<TTemplate> => {
  const { data } = await Axios.delete(`${API_ENDPOINT}/${id}`);
  return data;
};

export { getAll, post, deleteById };
