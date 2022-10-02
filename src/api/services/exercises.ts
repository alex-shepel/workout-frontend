import { Axios } from 'api/axios';
import { TExercise } from 'types/db';

const API_ENDPOINT = 'exercises';

const getByGroupId = async (groupId: number): Promise<TExercise[]> => {
  const params = { groupId };
  const { data } = await Axios.get(API_ENDPOINT, { params });
  return data;
};

const post = async (
  payload: Pick<TExercise, 'Title' | 'Description' | 'GroupID'>,
): Promise<TExercise> => {
  const { data } = await Axios.post(API_ENDPOINT, payload);
  return data;
};

const deleteById = async (id: number): Promise<TExercise> => {
  const { data } = await Axios.delete(`${API_ENDPOINT}/${id}`);
  return data;
};

export { getByGroupId, post, deleteById };
