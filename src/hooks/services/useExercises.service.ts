import { ExerciseEntity, GroupEntity, SimplifiedExerciseEntity } from 'types/entities';
import { useMemo } from 'react';
import { useAxios } from 'hooks/utils';
import { Service } from 'types/common';

const SERVICE_ENDPOINT = 'exercises';

interface PostPayload extends Pick<SimplifiedExerciseEntity, 'Title' | 'Description' | 'GroupID'> {}

interface ExercisesService extends Service {
  readonly endpoint: typeof SERVICE_ENDPOINT;
  readonly getByGroupId: (groupId: GroupEntity['ID']) => Promise<SimplifiedExerciseEntity[]>;
  readonly post: (payload: PostPayload) => Promise<SimplifiedExerciseEntity>;
  readonly deleteById: (id: ExerciseEntity['ID']) => Promise<SimplifiedExerciseEntity>;
}

const useExercisesService = () => {
  const axios = useAxios();

  return useMemo<ExercisesService>(() => {
    const getByGroupId: ExercisesService['getByGroupId'] = async groupId => {
      const params = { groupId };
      const { data } = await axios.get(SERVICE_ENDPOINT, { params });
      return data;
    };

    const post: ExercisesService['post'] = async payload => {
      const { data } = await axios.post(SERVICE_ENDPOINT, payload);
      return data;
    };

    const deleteById: ExercisesService['deleteById'] = async id => {
      const { data } = await axios.delete(`${SERVICE_ENDPOINT}/${id}`);
      return data;
    };

    return { endpoint: SERVICE_ENDPOINT, getByGroupId, post, deleteById };
  }, [axios]);
};

export default useExercisesService;
