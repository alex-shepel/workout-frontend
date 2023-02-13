import { useMemo } from 'react';
import { useAxios } from 'hooks/utils';
import { Service } from 'types/common';
import { ExerciseEntity, SimplifiedTemplateEntity, TemplateEntity } from 'types/entities';

const SERVICE_ENDPOINT = 'templates';

interface PostPayload extends Pick<TemplateEntity, 'Title' | 'Description'> {}
interface RelatePayload {
  TemplateID: TemplateEntity['ID'];
  ExerciseID: ExerciseEntity['ID'];
  AreRelated: boolean;
}

interface TemplatesService extends Service {
  readonly endpoint: typeof SERVICE_ENDPOINT;
  readonly getAll: () => Promise<TemplateEntity[]>;
  readonly post: (payload: PostPayload) => Promise<TemplateEntity>;
  readonly deleteById: (id: TemplateEntity['ID']) => Promise<TemplateEntity>;
  readonly getRelatedExercises: (id: TemplateEntity['ID']) => Promise<SimplifiedTemplateEntity>;
  readonly relateExercise: (payload: RelatePayload) => Promise<SimplifiedTemplateEntity>;
}

const useTemplatesService = () => {
  const axios = useAxios();

  return useMemo<TemplatesService>(() => {
    const getAll: TemplatesService['getAll'] = async () => {
      const { data } = await axios.get(SERVICE_ENDPOINT);
      return data;
    };

    const post: TemplatesService['post'] = async payload => {
      const { data } = await axios.post(SERVICE_ENDPOINT, payload);
      return data;
    };

    const deleteById: TemplatesService['deleteById'] = async id => {
      const { data } = await axios.delete(`${SERVICE_ENDPOINT}/${id}`);
      return data;
    };

    const getRelatedExercises: TemplatesService['getRelatedExercises'] = async id => {
      const { data } = await axios.get(`${SERVICE_ENDPOINT}/${id}/relations`);
      return data;
    };

    const relateExercise: TemplatesService['relateExercise'] = async payload => {
      const { data } = await axios.post(`${SERVICE_ENDPOINT}/relations`, payload);
      return data;
    };

    return {
      endpoint: SERVICE_ENDPOINT,
      getAll,
      post,
      deleteById,
      getRelatedExercises: getRelatedExercises,
      relateExercise,
    };
  }, [axios]);
};

export default useTemplatesService;
