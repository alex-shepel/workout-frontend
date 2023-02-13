import { useMemo } from 'react';
import { useAxios } from 'hooks/utils';
import { Service } from 'types/common';
import { SetEntity } from 'types/entities';

const SERVICE_ENDPOINT = 'sets';

type CompletePayload = {
  ID: SetEntity['ID'];
  Weight: SetEntity['Weight'];
  Repetitions: SetEntity['Repetitions'];
};

interface SetService extends Service {
  readonly endpoint: typeof SERVICE_ENDPOINT;
  readonly complete: (payload: CompletePayload) => Promise<SetEntity>;
}

const useSetService = () => {
  const axios = useAxios();

  return useMemo<SetService>(() => {
    const complete: SetService['complete'] = async payload => {
      const id = payload.ID;
      const queryPayload = { Weight: payload.Weight, Repetitions: payload.Repetitions };
      const { data } = await axios.post(`${SERVICE_ENDPOINT}/${id}`, queryPayload);
      return data;
    };

    return {
      endpoint: SERVICE_ENDPOINT,
      complete,
    };
  }, [axios]);
};

export default useSetService;
