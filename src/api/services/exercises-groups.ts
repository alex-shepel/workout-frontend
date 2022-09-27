import Axios from 'axios';
import { Defaults } from 'api/axios';
import { TExercisesGroup } from 'types/db';

const axios = Axios.create({
  ...Defaults,
  baseURL: [Defaults.baseURL, 'exercises-groups'].join('/'),
});

const getAll = async (): Promise<TExercisesGroup[]> => {
  const { data } = await axios.get('');
  return data;
};

const post = async (
  payload: Pick<TExercisesGroup, 'Title' | 'Description'>,
): Promise<TExercisesGroup> => {
  const { data } = await axios.post('', payload);
  return data;
};

export { getAll, post };
