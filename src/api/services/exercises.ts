import { Axios } from 'api/axios';
import { SimplifiedExerciseEntity, GroupEntity, ExerciseEntity } from 'types/entities';

const API_ENDPOINT = 'exercises';

const getByGroupId = async (groupId: GroupEntity['ID']): Promise<SimplifiedExerciseEntity[]> => {
  const params = { groupId };
  const { data } = await Axios.get(API_ENDPOINT, { params });
  return data;
};

const post = async (
  payload: Pick<SimplifiedExerciseEntity, 'Title' | 'Description' | 'GroupID'>,
): Promise<SimplifiedExerciseEntity> => {
  const { data } = await Axios.post(API_ENDPOINT, payload);
  return data;
};

const deleteById = async (id: ExerciseEntity['ID']): Promise<SimplifiedExerciseEntity> => {
  const { data } = await Axios.delete(`${API_ENDPOINT}/${id}`);
  return data;
};

export { getByGroupId, post, deleteById };
