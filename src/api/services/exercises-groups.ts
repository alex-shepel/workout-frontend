import { Axios } from 'api/axios';
import { TExercisesGroup } from 'types/db';

const API_ENDPOINT = 'exercises-groups';

const getAll = async (): Promise<TExercisesGroup[]> => {
  const { data } = await Axios.get(API_ENDPOINT);
  return data;
};

const post = async (
  payload: Pick<TExercisesGroup, 'Title' | 'Description'>,
): Promise<TExercisesGroup> => {
  const { data } = await Axios.post(API_ENDPOINT, payload);
  return data;
};

const deleteById = async (id: number): Promise<TExercisesGroup> => {
  const { data } = await Axios.delete(`${API_ENDPOINT}/${id}`);
  return data;
};

export { getAll, post, deleteById };
