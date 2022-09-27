import { QueryFunction } from 'react-query';
import { TExercisesGroup } from 'types/db';
import axios from 'api/axios';

const getAll: QueryFunction<TExercisesGroup[]> = async () => {
  const { data } = await axios.get('exercises-groups');
  return data;
};

export { getAll };
