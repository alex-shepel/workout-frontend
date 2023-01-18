import { GroupEntity } from 'types/entities';
import { useAxios } from 'hooks/utils';
import { useMemo } from 'react';

const SERVICE_ENDPOINT = 'groups';

interface PostPayload extends Pick<GroupEntity, 'Title' | 'Description'> {}

interface GroupsService {
  getAll: () => Promise<GroupEntity[]>;
  post: (payload: PostPayload) => Promise<GroupEntity>;
  deleteById: (id: GroupEntity['ID']) => Promise<GroupEntity>;
}

const useGroupsService = () => {
  const axios = useAxios();

  return useMemo<GroupsService>(() => {
    const getAll: GroupsService['getAll'] = async () => {
      const { data } = await axios.get(SERVICE_ENDPOINT);
      return data;
    };

    const post: GroupsService['post'] = async payload => {
      const { data } = await axios.post(SERVICE_ENDPOINT, payload);
      return data;
    };

    const deleteById: GroupsService['deleteById'] = async id => {
      const { data } = await axios.delete(`${SERVICE_ENDPOINT}/${id}`);
      return data;
    };

    return { getAll, post, deleteById };
  }, [axios]);
};

export default useGroupsService;
