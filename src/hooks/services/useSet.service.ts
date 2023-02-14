import { useMemo } from 'react';
import { useAxios } from 'hooks/utils';
import { Service } from 'types/common';
import { SetEntity } from 'types/entities';

const SERVICE_ENDPOINT = 'sets';

type UpdatePayload = {
  ID: SetEntity['ID'];
  Weight: SetEntity['Weight'];
  Repetitions: SetEntity['Repetitions'];
  Completed: SetEntity['Completed'];
};

interface SetService extends Service {
  readonly endpoint: typeof SERVICE_ENDPOINT;
  readonly update: (payload: UpdatePayload) => Promise<SetEntity>;
}

const useSetService = () => {
  const axios = useAxios();

  return useMemo<SetService>(() => {
    const update: SetService['update'] = async payload => {
      const id = payload.ID;
      const queryPayload: Omit<UpdatePayload, 'ID'> = {
        Weight: payload.Weight,
        Repetitions: payload.Repetitions,
        Completed: payload.Completed,
      };
      const { data } = await axios.post(`${SERVICE_ENDPOINT}/${id}`, queryPayload);
      return data;
    };

    return {
      endpoint: SERVICE_ENDPOINT,
      update,
    };
  }, [axios]);
};

export default useSetService;
