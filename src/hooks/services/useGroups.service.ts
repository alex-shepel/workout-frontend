import { GroupEntity } from 'types/entities';
import { useAxios } from 'hooks/utils';
import { useMemo } from 'react';
import { Service } from 'types/common';

const SERVICE_ENDPOINT = 'groups';

interface PostPayload extends Pick<GroupEntity, 'Title' | 'Description'> {}

interface GroupsService extends Service {
  readonly endpoint: typeof SERVICE_ENDPOINT;
  readonly getAll: () => Promise<GroupEntity[]>;
  readonly post: (payload: PostPayload) => Promise<GroupEntity>;
  readonly deleteById: (id: GroupEntity['ID']) => Promise<GroupEntity>;
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

    return { endpoint: SERVICE_ENDPOINT, getAll, post, deleteById };
  }, [axios]);
};

export default useGroupsService;
