import Axios from 'axios';
import { Defaults } from 'api/axios';
import { TExercise } from 'types/db';

const axios = Axios.create({
  ...Defaults,
  baseURL: [Defaults.baseURL, 'exercises'].join('/'),
});

const getByGroupId = async (groupId: number): Promise<TExercise[]> => {
  const params = { groupId };
  const { data } = await axios.get('', { params });
  return data;
};

const post = async (
  payload: Pick<TExercise, 'Title' | 'Description' | 'GroupID'>,
): Promise<TExercise> => {
  const { data } = await axios.post('', payload);
  return data;
};

export { getByGroupId, post };
