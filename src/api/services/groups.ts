import { Axios } from 'api/axios';
import { GroupEntity } from 'types/entities';

const API_ENDPOINT = 'groups';

const getAll = async (): Promise<GroupEntity[]> => {
  const { data } = await Axios.get(API_ENDPOINT);
  return data;
};

const post = async (payload: Pick<GroupEntity, 'Title' | 'Description'>): Promise<GroupEntity> => {
  const { data } = await Axios.post(API_ENDPOINT, payload);
  return data;
};

const deleteById = async (id: GroupEntity['ID']): Promise<GroupEntity> => {
  const { data } = await Axios.delete(`${API_ENDPOINT}/${id}`);
  return data;
};

export { getAll, post, deleteById };
