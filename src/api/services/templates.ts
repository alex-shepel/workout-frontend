import { Axios } from 'api/axios';
import { SimplifiedTemplateEntity, TemplateEntity } from 'types/entities';

const API_ENDPOINT = 'templates';

const getAll = async (): Promise<SimplifiedTemplateEntity[]> => {
  const { data } = await Axios.get(API_ENDPOINT);
  return data;
};

const post = async (
  payload: Pick<TemplateEntity, 'Title' | 'Description'>,
): Promise<TemplateEntity> => {
  const { data } = await Axios.post(API_ENDPOINT, payload);
  return data;
};

const deleteById = async (id: TemplateEntity['ID']): Promise<SimplifiedTemplateEntity> => {
  const { data } = await Axios.delete(`${API_ENDPOINT}/${id}`);
  return data;
};

export { getAll, post, deleteById };
