import { SimplifiedTemplateEntity, TemplateEntity } from 'types/entities';
import { useAxios } from 'hooks/utils';
import { useMemo } from 'react';

const SERVICE_ENDPOINT = 'templates';

interface PostPayload extends Pick<TemplateEntity, 'Title' | 'Description'> {}

interface TemplatesService {
  getAll: () => Promise<SimplifiedTemplateEntity[]>;
  post: (payload: PostPayload) => Promise<TemplateEntity>;
  deleteById: (id: TemplateEntity['ID']) => Promise<SimplifiedTemplateEntity>;
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

    return { getAll, post, deleteById };
  }, [axios]);
};

export default useTemplatesService;
